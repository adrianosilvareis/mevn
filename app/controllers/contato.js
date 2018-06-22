module.exports = (app) => {
  let controller = app.controllers.contato
  const Contato = app.models.contato

  controller = {
    listarContatos (req, res) {
      const { skip, limit } = req.params

      Contato.find().skip(Math.floor(skip)).limit(Math.floor(limit)).exec()
        .then(contatos => res.status(200).json(contatos))
        .catch(err => res.status(500).json(err))
    },
    obterContato (req, res) {
      const _id = req.params.id
      Contato.findById(_id).exec()
        .then(contato => {
          if (!contato) throw Error('Contato não encontrado!')

          res.status(200).json(contato)
        })
        .catch(err => res.status(404).json(err))
    },
    cadastrarContato (req, res) {
      const contato = req.body

      if (!contato._id) {
        Contato.create(contato)
          .then(contato => res.status(200).json(contato))
          .catch(err => res.status(500).json(err))
      } else {
        throw new Error('Contato já cadastrado')
      }
    },
    atualizarContato (req, res) {
      const contato = req.body

      Contato.findByIdAndUpdate(contato._id, contato, { new: true })
        .exec()
        .then(cont => res.status(200).json(cont))
        .catch(err => res.status(404).json({ err, message: 'Contato não encontrado!' }))
    },
    removerContato (req, res) {
      const _id = req.params.id

      Contato.remove({ _id })
        .then(() => res.end())
        .catch(err => res.status(500).json(err))
    },
  }

  return controller
}
