const mongoose = require('mongoose')

module.exports = () => {
  const schema = mongoose.Schema({
    nome: {
      type: String,
      require: true,
    },
    sobrenome: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      index: {
        unique: true,
      },
    },
  })

  return mongoose.model('Contato', schema)
}
