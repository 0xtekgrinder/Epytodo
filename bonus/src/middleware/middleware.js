require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = {
    verifyRegisterBody: (req, res, next) => {
        if (req.body.email && req.body.name && req.body.firstname && req.body.password)
            next();
        else
            res.status(400).send({msg: 'internal server error'});
    },
    verifyLoginBody: (req, res, next) => {
        if (req.body.email && req.body.password)
            next();
        else
            res.status(400).send({msg: 'internal server error'});
    },
    verifyUpdateUserBody: (req, res, next) => {
        if (req.body.email && req.body.password && req.body.created_at && req.body.firstname && req.body.name)
            next();
        else {
            res.status(400).send({msg: 'internal server error'});
        }
    },
    verifyJWT: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send({msg: 'No token, authorization denied'});
        }
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET, function(err, decoded) {
            if (err)
                res.status(401).json({msg: "Token is not valid"});
            else {
                req.sessionId = decoded;
                next();
            }
        });
    }
}