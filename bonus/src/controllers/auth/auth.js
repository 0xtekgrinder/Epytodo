const user = require('../../models/user/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    createUser: (req, res) => {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        user.create(req.body, (err, results) => {
            if (err) {
                return res.status(err.code).send({msg: err.msg});
            }
            user.fetchUserByEmail(req.body.email, (err, results) => {
                if (err) {
                    return res.status(err.code).send({msg: err.msg});
                }
                const token = jwt.sign({id: results[0].id}, process.env.SECRET, { expiresIn: 86400 });
                res.status(200).send({ token: token });
            });
        });
    },
    loginUser: (req, res) => {
        user.fetchUserByEmail(req.body.email, (err, results) => {
            if (err) {
                return res.status(err.code).send({msg: err.msg});
            }
            if (results.length == 0 || !bcrypt.compareSync(req.body.password, results[0].password)) {
                return res.status(403).send({msg: 'Invalid Credentials'});
            }
            const token = jwt.sign({id: results[0].id}, process.env.SECRET, { expiresIn: 86400 });
            res.status(200).send({ token: token });
        });
    }
};