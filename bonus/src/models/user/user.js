var pool = require('../../config/db.js');

module.exports = {
    create: (data, callBack) => {
        pool.query(`SELECT * FROM user WHERE email = ?`
        , [data.email], function(err, results, fields) {
            if (err) {
                return callBack({code: 500, msg: 'internal server error'}, null);
            }
            if (results.length != 0) {
                return callBack({code: 403, msg: 'account already exists'}, null);
            }
            pool.query(`INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)`
            , [data.email, data.name, data.firstname, data.password]
            , function(err, results, fields) {
                if (err) {
                    return callBack({code: 500, msg: 'internal server error'}, null);
                }
                return callBack(null, results);
            });
        });
    },
    fetchUserByEmail: (email, callBack) => {
        pool.query(`SELECT * FROM user WHERE email = ?`
        , [email], function(err, results, fields) {
            if (err) {
                return callBack({code: 500, msg: 'internal server error'}, null);
            }
            if (results.length == 0) {
                return callBack({code: 404, msg: 'internal server error'}, null);
            }
            return callBack(null, results);
        });
    },
    fetchUserById: (id, callBack) => {
        pool.query(`SELECT * FROM user WHERE id = ?`
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
    changeUserInfo: (data, callBack) => {
        pool.query(`UPDATE user SET email = ?, password = ?, created_at = ?, firstname = ?, name = ? WHERE id = ?`
        , [data.email, data.password, data.created_at, data.firstname, data.name, data.id], function(err, results, fields) {
            if (err) {
                return callBack({code: 500, msg: 'internal server error'}, null);
            }
            return callBack(null, results);
        });
    },
    delete: (id, callBack) => {
        pool.query(`DELETE FROM user WHERE id = ?`
        , [id], function(err, results, fields) {
            if (err) {
                return callBack({code: 500, msg: 'internal server error'}, null);
            }
            return callBack(null, results);
        });
    },
};