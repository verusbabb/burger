const express = require('express');
const exphbs = require('express-handlebars');
// const mysql = require('mysql');

const app = express();

const PORT = process.env.PORT || 8080;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));