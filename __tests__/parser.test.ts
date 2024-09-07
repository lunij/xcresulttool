import { describe, expect, it } from '@jest/globals'
import { Parser } from '../src/parser.js'

describe('Parser', () => {
  describe('parse', () => {
    it(`should parse XCResult's JSON format`, async () => {
      const sampleJSON = JSON.stringify({
        _type: { _name: 'ActionsInvocationRecord' },
        actions: {
          _type: { _name: 'Array' },
          _values: [
            {
              _type: { _name: 'ActionRecord' },
              actionResult: {
                _type: { _name: 'ActionResult' },
                coverage: {
                  _type: { _name: 'CodeCoverageInfo' }
                }
              }
            }
          ]
        },
        metrics: {
          _type: { _name: 'ResultMetrics' },
          testsCount: {
            _type: { _name: 'Int' },
            _value: '11'
          },
          testsFailedCount: {
            _type: { _name: 'Int' },
            _value: '1'
          }
        }
      })

      const result = await Parser.parse(sampleJSON)

      expect(result).toEqual({
        actions: [
          {
            actionResult: {
              coverage: {}
            }
          }
        ],
        metrics: {
          testsCount: 11,
          testsFailedCount: 1
        }
      })
    })
  })
})
