const connection = require('connection');
// const schema = require('./db/schema');
// const seeds = require('./db/seeds');
// const mysql = require('mysql');



//    * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

//      * `selectAll()`
//      * `insertOne()`
//      * `updateOne()`

//    * Export the ORM object in `module.exports`.

class Burger {
    constructor(burger_name, devoured) {
        this.burger_name = burger_name;
        this.devoured = devoured;
    }
}

Burger.prototype.selectAll = function () {
    connection.query('SELECT * from burgers', (err, res) => {
        if (err) throw err;
        return res;
    });
}

Burger.prototype.insertOne = function () {
    connection.query('INSERT INTO burgers VALUES (?, ?)', (err, res) => {
        if (err) throw err;
        return res;
    });
}

Burger.prototype.updateOne = function () {
    connection.query('UPDATE burgers SET ? WHERE ?', (err, res) => {
        if (err) throw err;
        return res;
    });
}

module.exports = { Burger }