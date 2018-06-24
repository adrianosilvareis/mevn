module.exports = (app) => {
  const controller = app.controllers.contato

  app.route('/contato/list')
    .get(controller.listarContatos)

  app.route('/contato')
    .post(controller.cadastrarContato)

  app.route('/contato/:id')
    .get(controller.obterContato)
    .put(controller.atualizarContato)
    .delete(controller.removerContato)
}
