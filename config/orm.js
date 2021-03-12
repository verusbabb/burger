//import the server connection
const connection = require('./connection.js');

//constructing question marks for use in defining query ?
const printQuestionMarks = (num) => {
    const arr = [];

    for (let i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = (ob) => {
    const arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, (e.g. chili cheesburger) add quotations (i.e. 'chili cheeseburger')
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = `'${value}'`;
            }
            // e.g. {burger: chili cheeseburger} => ["burger: 'chili cheeseburger'"]
            // e.g. {devoured=false} => ["devoured=true"]
            arr.push(`${key}=${value}`);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
};

const orm = {
    selectAll(tableInput, cb) {
        const queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne(table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}`;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        console.log(queryString);
        
        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // An example of objColVals would be {burger: bacon cheeseburger, douvered: true}
    updateAll(table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table}`;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    //delete burger
    delete(table, condition, cb) {
        let queryString = `DELETE FROM ${table}`;
        queryString += ' WHERE ';
        queryString += condition;
    
        connection.query(queryString, (err, result) => {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
};

// Export the orm object for the model (burger.js).
module.exports = orm;