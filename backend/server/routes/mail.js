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
    sendMail('j.komma@pfelling.de', 'default test', 'TEST');
    res.json({ message: 'Mail Page' });
});

// Route for password reset
router.post("/forgot-password", async (req, res) => {
    // 0 - create token
    const user = await userManager.getUserByEmail(req.query.email);
    const tokenExtencion = user[0].UserId + user[0].Password;
    const token = await jwtmanager.signTokenMail(user, tokenExtencion);
    // 1 - create link 
    const link = `http://localhost:4200/user/password-restore?id=${user[0].UserId}&token=${token}`;
    // 2 - send mail 
    sendMail(user[0].UserName, user[0].email, 'Password-Reset', '', link);
    res.json({ message: "Link sended" });
});

// Render password reset page
router.get("/reset-password", jwtmanager.verifyTokenMail, async (req, res) => {
    res.render('reset-password', { username: 'TestUserXX' });
});

// reset password
router.post("/reset-password", jwtmanager.verifyTokenMail, async (req, res) => {
    const { password, password2 } = req.body;
    // 0 - Compare passwords
    if (password.trim() !== password2.trim()) {
        res.sendStatus(403);
    }
    // 1 - Create Hash and Update Password
    const hashedPassword = await passwordHash.hash(password, saltRounds);
    const result = await userManager.updatePasswordById(req.query.id, hashedPassword);

    res.json({ message: result });
});


async function sendMail(username, to, subject, text, link) {
    // 0 - give File to render and variables [username, link]
    ejs.renderFile('views/reset-mail.ejs', { username: username, link: link }, async function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        // 1 - Create Transporter
        const transporter = nodemailer.createTransport({
            host: "send.one.com",
            port: 587,
            secure: false,
            auth: {
                user: "stock-images@saigon-bikes.com",
                pass: "StockImages123456"
            },
        });
        // provide transporter with information and send mail
        const info = await transporter.sendMail({
            from: "stock-images@saigon-bikes.com",
            to: to,
            subject: subject,
            text: text,
            html: data
        });
    });

}

/**
 * asdf
 * asdf
 * asdf
 * asdf
 * asdf
 */



module.exports = router;