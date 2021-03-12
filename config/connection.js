// create the connection information for the sql database

const mysql = require('mysql');

//creating connection and passing JawsDB_url as host control OR local host
const connection = mysql.createConnection(process.env.JAWSDB_URL|| {
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'MySQL#4355',
    database: 'burger_db',
});

//establishing connection to server
connection.connect((err) => {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
      }
      console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;