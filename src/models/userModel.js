const pool = require('../services/db');

var userModel = {
    selectAllUsers: (callback) => {

        const SQLSTATEMENT = 'SELECT * FROM user';
        pool.query(SQLSTATEMENT, callback);
    },

    selectUserById: (data, callback) => {

        const SQLSTATEMENT = 'SELECT * FROM user WHERE userid = ?';
        pool.query(SQLSTATEMENT, [data.userid], callback);
    },

    insertNewUser: (data, callback) => {

        const SQLSTATEMENT = 'INSERT INTO user (username, password, role, email) VALUES (?, ?, ?, ?)';
        pool.query(SQLSTATEMENT, [data.username, data.password, data.role, data.email], callback);
    },
    
    updateUserById : (data, callback) => {

        const SQLSTATEMENT = 'UPDATE user SET email = ?, password = ? WHERE userid = ?';
        pool.query(SQLSTATEMENT, [data.email, data.password, data.userid], callback);
    },

    deleteUserById : (data, callback) => {

        const SQLSTATEMENT = 'DELETE FROM user WHERE userid = ?';
        pool.query(SQLSTATEMENT, [data.userid], callback);
    },
    loginUser: (data, callback) => {

        const SQLSTATMENT = `select * from user where email=?`;
        pool.query(SQLSTATMENT, [data.email], callback);
    },
    checkUsernameOrEmailExist: (data, callback) => {

        const SQLSTATEMENT = 'SELECT * FROM user WHERE username = ? OR email = ?';
        pool.query(SQLSTATEMENT, [data.username, data.email], callback);
    },
    register: (data, callback) => {

        const SQLSTATEMENT = 'INSERT INTO user (username, password, role, email) VALUES (?, ?, ?, ?)';
        pool.query(SQLSTATEMENT, [data.username, data.password, data.role, data.email], callback);
    }
}

module.exports = userModel;