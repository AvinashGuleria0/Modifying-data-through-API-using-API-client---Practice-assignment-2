const express = require('express');
const { resolve } = require('path');
const connectToDb = require('./db');
const mongoose = require('mongoose');
const menuRoute = require('./menu')
require('dotenv').config();

const app = express();
app.use(express.json())

const port = process.env.PORT || 9000;
const DB_url = process.env.DB_URL;


app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.use('/menu', menuRoute)



app.listen(port, async() => {
  try{
    await connectToDb(DB_url);
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(`connected To Database`)

  }catch(err) {
    console.log(err);
  }

  console.log(`Example app listening at http://localhost:${port}`);
});
