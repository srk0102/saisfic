//Importing npm package
const db = require('../connection/DBConnection')

const { findIdInDB, findEmailInDB } = require('../utilities/util')

var allData = []

const saveGlobal = (data) => {
  allData = data
}

const checkData = async (req, res, next) => {
  const id = parseInt(req.params.id)
  const body = req.body
  if (id) {
    await db.promise().query(`SELECT * FROM leads;`)
      .then(data => {
        saveGlobal(data[0])
      })
      .catch(err => {
        res.status(404).send(err)
        next(err)
      })
    if (!findIdInDB(allData, id)) {
      res.status(404).send('Id is not in the database')
      next('Id is not in the database')
    }
    if (body.id) {
      if (findIdInDB(allData, body.id)) {
        res.status(404).send('or Updated Id already taken.')
        next('Updated Id already taken.')
      }
    }
    if (body.email) {
      if (findEmailInDB(allData, body.email)) {
        res.status(404).send('Email that you are trying to update is already taken')
        next('Email that you are trying to update is already taken')
      }
    }
    next()
  } else {
    // res.status(404).send("Id not found")
    next('id not found in URL')
  }
}

const checkBody = (req, res, next) => {
  const body = req.body
  if (body.email !== undefined) {
    res.status(406).send("you cannot update Email in bulk")
    next('you cannot update Email in bulk')
  }
  if (!Array.isArray(body.id)) {
    res.status(406).send("Id should be an array")
    next('Id should be an array')
  }
  next()
}

module.exports = { checkData, checkBody }