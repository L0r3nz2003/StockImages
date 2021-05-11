const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const passwordHash = require("bcrypt");

const jwtmanager = require("../controllers/jwt_manager");
const userManager = require("../controllers/user_manager");

const saltRounds = 10;

// send a Mail, its a test Method
router.post("/send", async (req, res) => {
  // send mail
  sendMail("Komma", "j.komma@pfelling.de", "default test", "TEST", "www.google.de");
  res.json({ message: "Mail Page" });
});

// Route for password reset
router.post("/forgot-password", async (req, res) => {
  // 0 - create token
  const user = await userManager.getUserByEmail(req.query.email);
  const tokenExtencion = user[0].UserId + user[0].Password;
  const token = await jwtmanager.signTokenMail(user, tokenExtencion);
  // 1 - create link
  const link = process.env.URL + `/user/password-restore?id=${user[0].UserId}&token=${token}`;
  // 2 - send mail
  sendMail(user[0].UserName, user[0].email, "Password-Reset", "", link);
  res.json({ message: "Link sended" });
});

/**
 * envirement
 * routes
 * interfaces
 */


// reset password
router.post("/reset-password", jwtmanager.verifyTokenMail, async (req, res) => {
  const { password, password2 } = req.body;
  // 0 - Compare passwords
  if (password.trim() !== password2.trim()) {
    res.sendStatus(403);
    return;
  }
  // 1 - Create Hash and Update Password
  const hashedPassword = await passwordHash.hash(password, saltRounds);
  const result = await userManager.updatePasswordById(req.query.id, hashedPassword);
  res.json({ message: result });
});

async function sendMail(username, to, subject, text, link) {
  // 0 - give File to render and variables [username, link]
  ejs.renderFile("views/reset-mail.ejs", { username: username, link: link }, async function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    // 1 - Create Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    // provide transporter with information and send mail
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: data,
    });
  }
  );
}

module.exports = router;
