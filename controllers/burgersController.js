const express = require('express');

const router = express.Router();

const burger = require('../models/burger.js')



// Create the `router` for the app, and export the `router` at the end of your file.

router.get('/', (req, res) => {
    burger.all((data) => {
        const hbsObject = {
            burgers: data,
        };
        console.log('hbsObject', hbsObject);
        res.render('index', hbsObject);
    });
});

//route declaration for new burger - calling the insert function from burger.js model
router.post('/api/burgers', (req, res) => {
    burger.insert(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) => {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
    });
});

//route declaration for updating burger devoured status - calling the insert function from burger.js model
router.put('/api/burgers/:id', (req, res) => {
    const id = `id = ${req.params.id}`;

    console.log('id', id);

    burger.update(
        {
            devoured: req.body.devoured,
        },
        id,
        (result) => {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

//BONUS:  route declaration for deleting a burger - calling the delete function from burger.js model
router.delete('/api/burgers/:id', (req, res) => {
    const id = `id = ${req.params.id}`;
  
    burger.delete(id, (result) => {
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    });
  });

// Export routes for server.js to use.
module.exports = router;