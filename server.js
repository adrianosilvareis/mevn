const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const compiler = webpack(config)

const app = require('./config/express')
require('./config/database.js')('mongodb://localhost:27017/contato')

app.use(middleware(compiler))

app.listen(app.get('port'), () => console.log(`Escutando na porta ${app.get('port')}`))
