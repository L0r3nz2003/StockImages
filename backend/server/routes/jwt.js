const e = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verify } = require("password-hash");

const jwtmanager = require("../controllers/jwt_manager");



router.get("/", (req, res) => {
    res.send("Geht");
});

router.post("/post", jwtmanager.verifyToken, (req, res) => {

    res.json({
        message: 'Post created....'
    });

});

router.post("/login", async (req, res) => {
    const user = {
        id: 1,
        username: 'hans'
    }

    const token = await jwtmanager.singToken(user);
    res.json({
        token: token
    });
    /*jwt.sign({ user: user }, secretKey, /*{ expiresIn: '30s' },(err, token) => {
        res.json({
            token: token
        });
    });*/
});


// verify token
/*
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if baerer is undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        // next middleware
        next();
    } else {
        // forbidden
        res.sendStatus(403);
    }


}*/






module.exports = router;