//require orm
const orm = require('../config/orm');

//build orm calls for selecting all burgers, inserting a new burger, updating a burger status, and deleting a burger
const burger = {
    all(cb) {
        orm.selectAll('burgers', (res) => cb(res));
    },

    insert(cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, (res) => cb(res));
    },

    update(objColVals, condition, cb) {
        orm.updateAll('burgers', objColVals, condition, (res) => cb(res));
    },

    delete(condition, cb) {
        orm.delete('burgers', condition, (res) => cb(res));
    },

}

//export orm object
module.exports = burger;