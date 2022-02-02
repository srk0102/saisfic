//Importing NPM modules
const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes/routes')

app.use(express.json())
app.use(cors())

app.use('/', routes)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
})