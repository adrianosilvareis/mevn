const request = require('supertest')
const app = require('../../../config/express')
const mongoose = require('mongoose')

describe('Controller teste de integração com Express e mongoDB', () => {
  let _id
  let contato = { nome: 'contatoTeste', sobrenome: 'sobrenomeTeste', email: 'email@teste.com' }

  beforeAll(async () => {
    mongoose.connect('mongodb://localhost:27017/contatoTeste')
  })

  afterAll(async (done) => {
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
      const response = await request(app).post('/contato').send(contato)

      _id = response.body._id

      expect(response.statusCode).toBe(200)
    })

    it('should receive 500 when contato exits', async () => {
      const response = await request(app).post('/contato').send(contato)
      expect(response.statusCode).toBe(500)
    })

    it('should receive 500 when contato unfinished', async () => {
      const response = await request(app).post('/contato').send({})
      expect(response.statusCode).toBe(500)
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
    contato = { _id, __v: 0, nome: 'jose', sobrenome: 'reis', email: 'zereis@email.com' }

    it('should receive 200 when the PUT method /contato/:id', async () => {
      const response = await request(app).put(`/contato/$${_id}`).send(contato)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(contato)
    })

    it('should receive 404 when the PUT method /contato/:id non exist id', async () => {
      contato._id = 1

      const response = await request(app).put('/contato/1').send(contato)

      expect(response.statusCode).toBe(404)
      expect(response.body.message).toEqual('Contato não encontrado!')
    })
  })

  describe('RemoverContato', () => {
    it('should receive 200 when DELETE method /contato/:id', async () => {
      contato._id = _id

      const response = await request(app).delete(`/contato/${_id}`)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(contato)
    })

    it('should receive 404 when DELETE method /contato/:id', async () => {
      const response = await request(app).delete('/contato/1')
      expect(response.statusCode).toBe(500)
    })
  })
})
