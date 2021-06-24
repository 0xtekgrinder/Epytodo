const user = require('../../models/user/user');
const todos = require('../../models/todos/todos');
require('dotenv').config()

module.exports = {
    getUser: (req, res) => {
        user.fetchUserById(req.sessionId.id, (err, results) => {
            if (err) {
                return res.status(err.code).send({msg: err.msg});
            }
            results[0].created_at = new Date(results[0].created_at).toISOString().slice(0, 19).replace('T', ' ');
            res.status(200).send(results[0]);
        });
    },
    getUserTodos: (req, res) => {
        todos.fetchTodosByUserId(req.sessionId.id, (err, results) => {
            if (err) {
                return res.status(err.code).send({msg: err.msg});
            }
            for (var i = 0; i < results.length; i++) {
                results[i].created_at = new Date(results[i].created_at).toISOString().slice(0, 19).replace('T', ' ');
                results[i].due_time = new Date(results[i].due_time).toISOString().slice(0, 19).replace('T', ' ');
            }
            res.status(200).send(results);
        });
    },
    getUserById: (req, res) => {
        if (req.params.id.match(/^[0-9]+$/) != null) {
            user.fetchUserById(req.params.id, (err, results) => {
                if (err) {
                    return res.status(err.code).send({msg: err.msg});
                }
                results[0].created_at = new Date(results[0].created_at).toISOString().slice(0, 19).replace('T', ' ');
                res.status(200).send(results[0]);
            });
        } else {
            user.fetchUserByEmail(req.params.id, (err, results) => {
                if (err) {
                    return res.status(err.code).send({msg: err.msg});
                }
                results[0].created_at = new Date(results[0].created_at).toISOString().slice(0, 19).replace('T', ' ');
                res.status(200).send(results[0]);
            });
        }
    },
    updateUser: (req, res) => {
        req.body.id = req.params.id;
        req.body.created_at = new Date(req.body.created_at);
        user.changeUserInfo(req.body, (err, results) => {
            if (err) {
                return res.status(err.code).send({msg: err.msg});
            }
            user.fetchUserById(req.params.id, (err, results) => {
                if (err) {
                    return res.status(err.code).send({msg: err.msg});
                }
                results[0].created_at = new Date(results[0].created_at).toISOString().slice(0, 19).replace('T', ' ');
                res.status(200).send(results[0]);
            });
        });
    },
    deleteUser: (req, res) => {
        user.fetchUserById(req.params.id, (err, results) => {
            if (err) {
                return res.status(err.code).send({msg: err.msg});
            }
            user.delete(req.params.id, (err, results) => {
                if (err) {
                    return res.status(err.code).send({msg: err.msg});
                }
                res.status(200).send({msg: `succesfully deleted record number: ${req.params.id}`});
            });
        });
    }
};