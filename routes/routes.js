//Importing NPM modules.
const express = require('express');
const { route } = require('express/lib/application');
const router = new express.Router();

const db = require('../connection/DBConnection')

/**
 * Route "/leads" TYPE:- GET
 * @returns all leads that are present in DataBase
 */
router.get('/leads', async (req, res) => {
  await db.promise().query(`SELECT * FROM leads;`)
    .then(data => {
      res.status(200).send(data[0])
    })
    .catch(err => {
      res.status(500).send(err)
    })
});

/**
 * Route "/leads:id" TYPE:- GET
 * @returns the particular id lead that given in params.
 */
router.get('/leads/:id', async (req, res) => {
  const id = req.params.id
  if (id) {
    await db.promise().query(`SELECT * FROM leads WHERE id = ${id} ;`)
      .then(data => {
        res.status(200).send(data[0])
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }
})

/**
 * Route "/leads" TYPE:- POST -> accepts JSON data in body
 * @returns 201 on successful creation, 409 conflict on duplication.
 */
router.post('/leads', async (req, res) => {
  console.log(req.body)
  const { id, title, firstName, lastName, email } = req.body
  if (id && title && firstName && lastName && email) {
    try {
      db.promise().query(`INSERT INTO leads VALUES(${id}, '${title}', '${firstName}', '${lastName}', '${email}' ); `)
      res.send({ 'msg': 'Data updated successfully' }).status(201)
    }
    catch (err) {
      res.send(err)
    }
  } else {
    console.log("some thing is missing")
  }
})

/**
 * Route "/leads/bulk" TYPE:- POST -> accepts CSV file in body
 * @returns report of file upload in JSON or you can download the CSV report.
 */
router.post('/leads/bulk', async (req, res) => {
  const body = req.body
  res.send(body)
})

/**
 * Route "/leads/:id" TYPE:- PATCH -> accepts body with JSON.
 * @returns 202 status if lead is updated or else 204 id not found.
 */
router.patch('/leads/:id', async (req, res) => {
  const id = req.params.id
  res.send(id)
})

/**
 * Route "/leads/bulk" TYPE:- PATCH -> accepts body with JSON.
 * @returns 200 status if leads are updated or else 204 id not found.
 */
router.patch('/leads/bulk', async (req, res) => {
  const body = req.body
  res.send(body)
})

/**
 * Route "/leads/:id" TYPE:- DELETE
 * @returns 200 status if lead got deleted or else 204 if id not found.
 */
router.delete('/leads/:id', async (req, res) => {
  const id = req.params.id
  res.send(id)
})

//Exporting the routes
module.exports = router;