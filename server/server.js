const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');
const morgan = require('morgan');
const path = require('path');

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static("public"));

app.use('/api', apiRouter);
app.use('/jquery', express.static( path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

app.listen(3000);
