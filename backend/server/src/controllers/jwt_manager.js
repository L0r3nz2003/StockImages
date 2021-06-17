const jwt = require("jsonwebtoken");

const userManager = require("./user_manager");


class JwtManager {
    // Create normal Torken
    singToken = async (user) => {
        return jwt.sign({ user: user }, process.env.PRIVATE_KEY, { expiresIn: '365 days', algorithm: 'RS256' });
    }

    // verify token
    verifyToken = async (req, res, next) => {
        // get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if baerer is undefined
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            jwt.verify(bearerToken, process.env.PUBLIC_KEY.replace(/\"/g, ""), (err, autoData) => {
                if (err){
                    res.sendStatus(403); 
                } 
            });
            next();
        } else {
            // forbidden
            res.sendStatus(403);
        }
    }

    // Create token for mail-Passwordreset
    signTokenMail = async (user, keyextension) => {
        return jwt.sign({ user }, process.env.PRIVATE_KEY + keyextension, { expiresIn: '15m' });
    }

    // verify token for mail-Passwordreset
    verifyTokenMail = async (req, res, next) => {
        const user = await userManager.getSingleUser(req.query.id);
        const keyextension = user[0].UserId + user[0].Password;
        jwt.verify(req.query.token, process.env.PUBLIC_KEY.replace(/\"/g, "") + keyextension, (err, autoData) => {
            if (err) res.sendStatus(403);
        });
        next();
    }

}

module.exports = new JwtManager();