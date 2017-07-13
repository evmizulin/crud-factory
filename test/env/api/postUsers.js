const factory = require('./../../../index')
const dbEntity = require('./../Db').user

module.exports = factory.create({
  schema: {
    type: 'object',
    additionalProperties: false,
    required: [
      'name',
      'phone'
    ],
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 20
      },
      phone: {
        type: 'string',
        minLength: 6,
        maxLength: 15,
        pattern: '^\\d*$'
      }
    }
  },
  errors: {
    name: {
      minLength: 'String is not valid'
    }
  },
  dbEntity: dbEntity,
  codes: {
    '200': (req, res, entity) => {
      res.status(200).send({ id: entity._id })
    },
    '400': (req, res, err) => {
      res.status(400).send(err)
    },
    '500': (req, res, err) => {
      res.status(500).send({ error: 'internal server error' })
    }
  }
})
