const express = require('express')
const bodyParser = require('body-parser')

const postUsers = require('./api/postUsers')

const app = express()

app.use(bodyParser.json())

app.post('/users', postUsers)

module.exports = new Promise((resolve, reject) => {
  app.listen(8080, () => {
    console.log('listen on 8080')
    resolve()
  })
})
