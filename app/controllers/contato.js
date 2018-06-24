module.exports = (app) => {
  let controller = app.controllers.contato
  const Contato = app.models.contato

  controller = {
    listarContatos: async (req, res) => {
      const { page = 1, limit = 10, sort = '_id' } = req.query

      try {
        const [ result, count ] = await Promise.all([
          Contato.find({}).skip(Math.floor(limit) * (Math.floor(page) - 1)).limit(Math.floor(limit)).sort(sort).lean().exec(),
          Contato.count({}),
        ])

        res.status(200).json({ result, count })
      } catch (err) {
        res.statu(500).json(err)
      }
    },
    obterContato: async (req, res) => {
      const _id = req.params.id

      try {
        const contato = await Contato.findById(_id).lean().exec()
        res.status(200).json(contato)
      } catch (err) {
        res.status(404).json(err)
      }
    },
    cadastrarContato: async (req, res) => {
      const contato = req.body

      try {
        const resposta = await Contato.create(contato)
        res.status(200).json(resposta)
      } catch (err) {
        res.status(500).json(err)
      }
    },
    atualizarContato: async (req, res) => {
      const contato = req.body

      try {
        await Contato.findByIdAndUpdate(contato._id, contato, { new: true }).exec()
        res.status(200).json(contato)
      } catch (err) {
        res.status(404).json({ message: 'Contato não encontrado!' })
      }
    },
    removerContato: async (req, res) => {
      const _id = req.params.id

      try {
        const contato = await Contato.findOneAndRemove({ _id })
        res.status(200).json(contato)
      } catch (err) {
        res.status(500).json(err)
      }
    },
  }

  return controller
}
