//Importing NPM modules.
const express = require('express')

const app = express()

const router = new express.Router();

/**
 * Route "/leads" TYPE:- GET
 * @returns all leads that are present in DataBase
 */
router.get('/leads', async(req, res) => {
  res.send("all leads")
})

/**
 * Route "/leads:id" TYPE:- GET
 * @returns the particular id lead that given in params.
 */
router.get('/leads/:id', async(req, res) => {
  const id = req.params.id
  res.send(id)
})

/**
 * Route "/leads" TYPE:- POST
 * @returns 201 on successful creation, 409 conflict on duplication.
 */
router.post('/leads', async(req, res) => {
  const body = req.body
  res.send(body)
})

//Exporting the routes
module.exports = router;