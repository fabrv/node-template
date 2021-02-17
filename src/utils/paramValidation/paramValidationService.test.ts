/* eslint-disable no-undef */
import chai from 'chai'
import { createRequest, createResponse } from 'node-mocks-http'
import { validateBody, validateQuery } from './paramValidationService'

const assert = chai.assert

describe('Parameter Validation Service', () => {
  describe('validateQuery(params)', () => {
    const mockRequest = createRequest({
      method: 'GET',
      query: {
        id: '1324',
        name: 'John Doe'
      }
    })
    const mockResponse = createResponse()

    it('Should enter into next function without error', () => {
      validateQuery(['id', 'name'])(mockRequest, mockResponse, (error: any) => {
        assert.equal(error, undefined)
      })
    })

    it('Should enter into next function with 400 error', () => {
      validateQuery(['id', 'name', 'test'])(mockRequest, mockResponse, (error: any) => {
        assert.isObject(error)
        assert.equal(error?.status, 400)
      })
    })
  })

  describe('validateBody(predicate: (body) => boolean)', () => {
    const mockRequest = createRequest({
      method: 'GET',
      body: {
        id: 1234,
        name: 'John Doe',
        falsy: 0
      }
    })
    const mockResponse = createResponse()

    it('Should enter into next function without error', () => {
      validateBody((body) => (body.id && body.name) !== undefined)(
        mockRequest, mockResponse, (error: any) => {
          assert.equal(error, undefined)
        }
      )
    })

    it('Should enter into next function with 400 error if parameters fails predicate valdiation', () => {
      validateBody((body) => (body.id && body.name && body.test) !== undefined)(
        mockRequest, mockResponse, (error: any) => {
          assert.isObject(error)
          assert.equal(error?.status, 400)
        }
      )
    })

    it('Should enter into next function with 400 error if predicate does not return true', () => {
      validateBody(body => body.falsy)(mockRequest, mockResponse, (error: any) => {
        assert.isObject(error)
        assert.equal(error?.status, 400)
      })
    })

    it('Should enter into next function with 400 error if predicate returns false', () => {
      validateBody(() => false)(mockRequest, mockResponse, (error: any) => {
        assert.isObject(error)
        assert.equal(error?.status, 400)
      })
    })
  })
})
