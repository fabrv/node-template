/* eslint-disable no-undef */
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../app'
import { IndexController } from './IndexController'

chai.use(chaiHttp)
chai.should()
const assert = chai.assert

describe('Index Controller', () => {
  describe('sum(a, b)', () => {
    it('Should return the sum of two numbers', () => {
      const randa = Math.random() * 100
      const randb = Math.random() * 100

      assert.equal(new IndexController().sum(randa, randb), randa + randb)
    })
  })

  describe('error()', () => {
    it('Should return an error', () => {
      assert.throws(new IndexController().error)
    })
  })

  describe('hello(name)', () => {
    it('Should return a gretting with the name parameter', () => {
      assert.equal(new IndexController().hello('world'), 'Hello world')
    })
  })
})

describe('Index Route', () => {
  describe('GET /', () => {
    it('Should return 200 status and a JSON', () => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          if (err) throw err
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
    })
  })

  describe('GET /sum', () => {
    it('Should return the sum of two random numbers', () => {
      const randa = Math.random() * 100
      const randb = Math.random() * 100

      chai.request(app)
        .get(`/sum?a=${randa}&b=${randb}`)
        .end((err, res) => {
          if (err) throw err
          res.should.have.status(200)
          assert.equal(res.text.toString(), (randa + randb).toString())
        })
    })

    it('Should return NAN if a non number is sent as parameter', () => {
      const randa = Math.random() * 100

      chai.request(app)
        .get(`/sum?a=${randa}&b=String`)
        .end((err, res) => {
          if (err) throw err
          res.should.have.status(200)
          assert.equal(res.text, 'NaN')
        })
    })

    it('Should return 400 if all parameters are not sent', () => {
      chai.request(app)
        .get('/sum?a=12')
        .end((err, res) => {
          if (err) throw err
          res.should.have.status(400)
          res.body.should.be.a('object')
        })
    })
  })

  describe('GET /error', () => {
    it('Should return a 500 error', () => {
      chai.request(app)
        .get('/error')
        .end((err, res) => {
          if (err) throw err
          res.should.have.status(500)
          res.body.should.be.a('object')
        })
    })
  })

  describe('GET /:name', () => {
    it('Should greet the name parameter', () => {
      const randomString = Math.random().toString(36).substring(7)
      chai.request(app)
        .get(`/${randomString}`)
        .end((err, res) => {
          if (err) throw err
          res.should.have.status(200)
          assert.equal(res.text.toString(), `Hello ${randomString}`)
        })
    })
  })

  describe('GET /:name/:nonexistant', () => {
    it('Should return a 404 error message', () => {
      const randomStringA = Math.random().toString(36).substring(7)
      const randomStringB = Math.random().toString(36).substring(7)

      chai.request(app)
        .get(`/${randomStringA}/${randomStringB}`)
        .end((err, res) => {
          if (err) throw err
          res.should.have.status(404)
          res.body.should.be.a('object')
        })
    })
  })
})
