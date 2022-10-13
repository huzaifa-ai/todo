const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || '8000';

// Middlewares

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// Connecting Database

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => console.log(err));

fs.readdirSync('./routes').map((r) =>
  app.use('/api', require('./routes/' + r))
);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
