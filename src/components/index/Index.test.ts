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
})
