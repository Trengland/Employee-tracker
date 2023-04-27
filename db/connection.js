const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'AlaskaPie1*',
    database: 'employee_db'
});


connection.connect((err) => {
    if(err) throw err
});

module.exports = connection
