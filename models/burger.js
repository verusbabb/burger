const orm = require('./config/orm');

// * Also inside `burger.js`, create the code that will call the ORM functions using burger specific input for the ORM.

//     * Export at the end of the `burger.js` file.

const newBurger = {
    all(cb) {
        orm.selectAll('burgers', (res) => cb(res));
    },

    insert(cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, (res) => cb(res));
    },

    update(objColVals, condition, cb) {
        orm.updateAll('burgers', objColVals, condition, (res) => cb(res));
    }

}

module.exports = newBurger;