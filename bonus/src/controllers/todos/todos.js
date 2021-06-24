const user = require('../../models/user/user.js');
const todos = require('../../models/todos/todos.js');
require('dotenv').config()

module.exports = {
    getTodosById: (req, res) => {
        todos.fetchTodoById(req.params.id, (err, results) => {
            if (err) {
                return res.status(err.code).send({msg: err.msg});
            }
            results[0].created_at = new Date(results[0].created_at).toISOString().slice(0, 19).replace('T', ' ');
            results[0].due_time = new Date(results[0].due_time).toISOString().slice(0, 19).replace('T', ' ');
            res.status(200).send(results[0]);
        });
    },
    getTodos: (req, res) => {
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
    putTodos: (req, res) => {
        req.body.id = req.params.id
        todos.fetchTodoById(req.body.id, (err, results) => {
            if (err) {
                return res.status(err.code).send({msg: err.msg});
            }
            todos.updateTodo(req.body, (err, results) => {
                if (err) {
                    return res.status(err.code).send({msg: err.msg});
                }
                res.status(200).send({title: req.body.title, description: req.body.description, due_time: req.body.due_time, user_id: req.body.user_id, status: req.body.status});
            });
        });
    },
    postTodos: (req, res) => {
        todos.createTodos(req.body, (err, results) => {
            if (err) {
                return res.status(err.code).send({msg: err.msg});
            }
            todos.fetchTodosByUserId(req.sessionId.id, (err, results) => {
                if (err) {
                    return res.status(err.code).send({msg: err.msg});
                }
                results[results.length - 1].created_at = new Date(results[results.length - 1].created_at).toISOString().slice(0, 19).replace('T', ' ');
                results[results.length - 1].due_time = new Date(results[results.length - 1].due_time).toISOString().slice(0, 19).replace('T', ' ');
                res.status(200).send(results[results.length - 1]);
            });
        });
    },
    deleteTodos: (req, res) => {
        todos.fetchTodoById(req.params.id, (err, results) => {
            if (err) {
                return res.status(err.code).send({msg: err.msg});
            }
            todos.deleteTodo(req.params.id, (err, results) => {
                if (err) {
                    return res.status(err.code).send({msg: err.msg});
                }
                res.status(200).send({msg: `succesfully deleted record number : ${req.params.id}`});
            });
        });
    },
}