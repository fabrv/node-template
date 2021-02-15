/* eslint-disable no-undef */
import chai from 'chai'
import { createRequest, createResponse } from 'node-mocks-http'
import { validateQuery } from './paramValidationService'

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
})
