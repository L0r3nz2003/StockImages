const e = require("express");
const express = require("express");
const router = express.Router();

const userManager = require("../controllers/user_manager");

const nodemailer = require("nodemailer");

const jwtmanager = require("../controllers/jwt_manager");
const ejs = require("ejs");

const passwordHash = require("bcrypt");
const saltRounds = 10;



router.post("/send", async (req, res) => {

    sendMail('j.komma@pfelling.de', 'default test', 'TEST');

    res.json({
        message: 'Mail Page'
    });

});



router.get("/passwort-vergessen", async (req, res) => {
    res.send('forgot-password');
});

router.post("/passwort-vergessen", async (req, res) => {
    const user = await userManager.getUserByName(req.query.username);
    // token erzeugen
    const token = await jwtmanager.signTokenMail(user, user[0].Password);
    // link erzeugen
    const link = `http://localhost:3000/mail/reset-password?id=${user[0].UserId}&token=${token}`;
    //email senden

    sendMail(user[0].username, user[0].email, 'Password-Reset', '', link);



    res.json({
        message: "Link sended",
        //link: link
    });

});

router.get("/reset-password", jwtmanager.verifyTokenMail, async (req, res) => {
    res.render('reset-password', { username: 'TestUserXX' });
});

router.post("/reset-password", jwtmanager.verifyTokenMail, async (req, res) => {
    const { password, password2 } = req.body;

    if (password == password2) {

        const hashedPassword = await passwordHash.hash(password, saltRounds)
        console.log(req.query.id);
        const result = await userManager.updatePasswordById(req.query.id, hashedPassword);
        console.log(hashedPassword);
        console.log(result);

        res.json({
            message: result
        });
    } else {
        res.sendStatus(403);
    }


});


router.get("/preview", async (req, res) => {
    res.render('reset-mail', { username: 'DaKomma', link: 'https://www.google.de' });
});





async function sendMail(username, to, subject, text, link) {

    ejs.renderFile('views/reset-mail.ejs', { username: username, link: link }, async function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        const transporter = nodemailer.createTransport({
            host: "send.one.com",
            port: 587,
            secure: false,
            auth: {
                user: "stock-images@saigon-bikes.com",
                pass: "StockImages123456"
            },
        });

        const info = await transporter.sendMail({
            from: "stock-images@saigon-bikes.com",
            to: to,
            subject: subject,
            text: text,
            html: data
        });

        console.log("Message sent: %s", info.messageId);

    });

}









module.exports = router;