const nodemailer = require("nodemailer");
const ejs = require("ejs");
const passwordHash = require("bcrypt");

const jwtmanager = require("./jwt_manager");
const userManager = require("./user_manager");
const userService = require("../services/user_service.js");

class MailManager {

    // forgot password 
    forgotPassword = async (req, res, next) => {
        try {
            // 0 - create token
            const user = await userService.getUserByEmail(req.query.email);
            const tokenExtencion = user[0].UserId + user[0].Password;
            const token = await jwtmanager.signTokenMail(user, tokenExtencion);

            // 1 - create link
            const link = process.env.FRONTEND_URL + `/user/password-restore?id=${user[0].UserId}&token=${token}`;

            // 2 - send mail
            ejs.renderFile(__dirname + "\\..\\templates\\reset-mail.ejs", { username: user[0].UserName, link: link }, async (err, data) => {
                if (err) return;

                // 3 - Create Transporter
                const transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASSWORD,
                    },
                });

                // 4 - provide transporter with information and send mail
                const info = await transporter.sendMail({
                    from: '"StockImages" <' + process.env.MAIL_USER + '>',
                    to: user[0].email,
                    subject: "Password-Reset",
                    text: "",
                    html: data,
                });

            });

            // 5 - send response
            res.json({ message: "Link sended" });
        } catch (error) {
            next(error);
        }
    }

    // reset password
    resetPassword = async (req, res, next) => {
        try {
            const { password, password2 } = req.query;

            // 0 - Compare passwords
            if (password.trim() !== password2.trim()) {
                res.sendStatus(403);
                return;
            }

            // 1 - Create Hash and Update Password
            const hashedPassword = await passwordHash.hash(password, parseInt(process.env.SALTROUNDS));
            const result = await userService.updatePasswordById(req.query.id, hashedPassword);
            res.json({ message: result });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new MailManager();