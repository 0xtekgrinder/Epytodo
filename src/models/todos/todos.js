var pool = require('../../config/db.js');

module.exports = {
    fetchTodosByUserId: (id, callBack) => {
        pool.query(`SELECT * FROM todo WHERE user_id = ?`
        , [id], function(err, results, fields) {
            if (err) {
                return callBack({code: 500, msg: 'internal server error'}, null);
            }
            if (results.length == 0) {
                return callBack({code: 404, msg: 'internal server error'}, null);
            }
            return callBack(null, results);
        });
    },
    fetchTodoById: (id, callBack) => {
        pool.query(`SELECT * FROM todo WHERE id = ?`
        , [id], function(err, results, fields) {
            if (err) {
                return callBack({code: 500, msg: 'internal server error'}, null);
            }
            if (results.length == 0)
                return callBack({code: 404, msg: 'Not found'}, null);
            return callBack(null, results);
        });
    },
    updateTodo: (data, callBack) => {
        pool.query(`UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?`
        , [data.title, data.description, data.due_time, data.user_id, data.status, data.id], function(err, results, fields) {
            if (err) {
                return callBack({code: 500, msg: 'internal server error'}, null);
            }
            return callBack(null, results);
        });
    },
    createTodos: (data, callBack) => {
        pool.query(`INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)`
        , [data.title, data.description, data.due_time, data.user_id, data.status]
        , function(err, results, fields) {
            if (err) {
                return callBack({code: 500, msg: 'internal server error'}, null);
            }
            return callBack(null, results);
        });
    },
    deleteTodo: (id, callBack) => {
        pool.query(`DELETE FROM todo WHERE id = ?`
        , [id], function(err, results, fields) {
            if (err) {
                return callBack({code: 500, msg: 'internal server error'}, null);
            }
            return callBack(null, results);
        });
    }
}