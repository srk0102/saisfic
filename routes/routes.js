//Importing NPM modules.
const express = require('express');
const { route } = require('express/lib/application');
const router = new express.Router();
const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');

const upload = multer({ dest: 'temp/csv/' });

const db = require('../connection/DBConnection')

const { dataBeautify } = require('../utilities/util')

var global = []

const saveGlobal = (data) => {
  global = data
}

/**
 * Route "/leads" TYPE:- GET
 * @returns all leads that are present in DataBase
 */
router.get('/leads', async (req, res) => {
  await db.promise().query(`SELECT * FROM leads;`)
    .then(data => {
      saveGlobal(data[0])
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
    await db.promise().query(`INSERT INTO leads VALUES(${id}, '${title}', '${firstName}', '${lastName}', '${email}' ); `)
      .then(data => {
        res.status(200).send({ 'msg': "Data Updated Successfully" }, data)
      })
      .catch(err => {
        res.status(404).send({ "msg": err })
      })
  } else {
    res.status(404).send({ 'msg': "Missing Data" })
  }
})

/**
 * Route "/leads/bulk" TYPE:- POST -> accepts CSV file in body
 * @returns report of file upload in JSON or you can download the CSV report.
 */
router.post('/leads/bulk', upload.single('file'), async (req, res) => {
  const path = req.file?.path
  var fileRows = []
  if (path) {
    csv.parseFile(path)
      .on("data", function (data) {
        fileRows.push(data)
      })
      .on("end", async function () {
        if (fileRows.length > 0) {
          await db.promise().query(`SELECT * FROM leads;`)
            .then(data => {
              saveGlobal(data[0])
            })
            .catch(err => {
              res.status(500).send(err)
            })
          let result = dataBeautify(fileRows, global)
          var finalArray = result[0].map(function (obj) {
            return [obj.id, obj.title, obj.firstName, obj.lastName, obj.email];
          });
          if (finalArray.length > 0) {
            await db.promise().query("INSERT INTO leads VALUES ?;", [finalArray])
              .then(data => {
                res.status(200).send({
                  "created": result[0].length,
                  "duplicates": result[1].length + result[3].length,
                  "error": result[2].length,
                  "report": "link"
                })
              })
              .catch(err => {
                res.status(404).send(err)
              })
          } else {
            res.status(200).send({
              "created": result[0].length,
              "duplicates": result[1].length + result[3].length,
              "error": result[2].length,
              "report": "link"
            })
          }
        }
        else {
          res.status(404).send({ "msg": "Empty Csv found" })
        }
        fs.unlinkSync(path)
      })
  }
  else {
    res.status(404).send({ "msg": "File not found" })
  }
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