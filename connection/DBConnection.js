const mysql = require('mysql2')
const {URI} = require('../DBURI')

module.exports = mysql.createConnection(URI)