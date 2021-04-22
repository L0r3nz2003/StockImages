const e = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verify } = require("password-hash");

const userManager = require("../controllers/user_manager");

// jwt secret key
const secretKey = 'topSecret';

class JwtManager {
    // Create Torken
    singToken = async (user) => {
        return jwt.sign({ user: user }, secretKey);
    }

    signTokenMail = async (user, keyextension) => {
        return jwt.sign({ user }, secretKey + keyextension, { expiresIn: '15m' });
    }

    verifyTokenMail = async (req, res, next) => {
        const user = await userManager.getSingleUser(req.query.id);
        const keyextension = user[0].Password;
        jwt.verify(req.query.token, secretKey + keyextension, (err, autoData) => {
            if (err) {
                res.sendStatus(403);
            }
        });
        next();
    }






    // verify token
    verifyToken = async (req, res, next) => {
        // get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if baerer is undefined
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            jwt.verify(req.token, secretKey, (err, autoData) => {
                if (err) {
                    res.sendStatus(403);
                }
            });
            next();
        } else {
            // forbidden
            res.sendStatus(403);
        }


    }

}

module.exports = new JwtManager();