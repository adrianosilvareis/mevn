const express = require('express')
const load = require('express-load')
const bodyParser = require('body-parser')

const app = express()

app.set('port', 3000)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('public'))

load('models', { cwd: 'app' })
  .then('controllers')
  .then('routes')
  .into(app)

module.exports = app
