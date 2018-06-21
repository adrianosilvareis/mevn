const request = require('supertest')
const app = require('../../../config/express')
const mongoose = require('mongoose')

describe('Controller teste de integração com Express e mongoDB', () => {
  let _id

  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/contatoTeste')
  })

  afterAll((done) => {
    mongoose.disconnect(done)
  })

  describe('ListarTodos', () => {
    it('should receive 200 when the GET method /contato/list', async () => {
      const response = await request(app).get('/contato/list')
      expect(response.statusCode).toBe(200)
    })
  })

  describe('CadastrarContato', () => {
    it('should receive 200 when the POST method /contato', async () => {
      const contato = { nome: 'contatoTeste', sobrenome: 'sobrenomeTeste', email: 'email@teste.com' }

      const response = await request(app).post('/contato').send(contato)

      _id = response.body._id

      contato.__v = 0
      contato._id = _id

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(contato)
    })
  })

  describe('ObterContato', () => {
    it('should receive 200 when the GET method /contato/:id and exist id', async () => {
      const response = await request(app).get(`/contato/${_id}`)
      expect(response.statusCode).toBe(200)
    })

    it('should receive 404 when the GET method /contato/:id and non exist id', async () => {
      const response = await request(app).get('/contato/1')
      expect(response.statusCode).toBe(404)
    })
  })

  describe('AtualizarContato', () => {
    it('should receive 200 when the PUT method /contato/:id', async () => {
      const contato = { _id, __v: 0, nome: 'jose', sobrenome: 'reis', email: 'zereis@email.com' }
      const response = await request(app).put(`/contato/$${_id}`).send(contato)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(contato)
    })

    it('should receive 404 when the PUT method /contato/:id non exist id', async () => {
      const contato = { _id: 1, __v: 0, nome: 'jose', sobrenome: 'reis', email: 'zereis@email.com' }
      const response = await request(app).put('/contato/1').send(contato)

      expect(response.statusCode).toBe(404)
      expect(response.body.message).toEqual('Contato não encontrado!')
    })
  })

  describe('RemoverContato', () => {
    it('should receive 200 when DELETE method /contato/:id', async () => {
      const response = await request(app).delete(`/contato/${_id}`)
      expect(response.statusCode).toBe(200)
    })

    it('should receive 404 when DELETE method /contato/:id', async () => {
      const response = await request(app).delete('/contato/1')
      expect(response.statusCode).toBe(500)
    })
  })
})
