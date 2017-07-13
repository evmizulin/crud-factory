const validator = require('tvalidator')
const isIdValid = require('./isIdValid')

function Factory() {

  this.create = (options) => {

    const schema = options.schema
    const messages = options.errors
    const dbEntity = options.dbEntity

    return (req, res) => {
      const body = req.body
      const r200 = (...props) => options.codes['200'](req, res, ...props)
      const r400 = (...props) => options.codes['400'](req, res, ...props)
      const r500 = (...props) => options.codes['500'](req, res, ...props)

      const validation = validator(body, schema, messages)
      const valid = validation.valid
      const errors = validation.errors
      if (!valid) return r400(errors)

      const entity = new dbEntity(body)
      entity.save()
        .then(r200)
        .catch(r500)
    }
  }

  this.updateFake = (options) => {

    const schema = options.schema
    const messages = options.errors
    const dbEntity = options.dbEntity

    return (req, res) => {
      const id = req.params.id
      const body = req.body
      const r200 = (...props) => options.codes['200'](req, res, ...props)
      const r400 = (...props) => options.codes['400'](req, res, ...props)
      const r404 = (...props) => options.codes['404'](req, res, ...props)
      const r500 = (...props) => options.codes['500'](req, res, ...props)

      if (!isIdValid(id)) return r404({ error: 'entity id is not valid' })

      const validation = validator(body, schema, messages)
      const valid = validation.valid
      const errors = validation.errors
      if (!valid) return r400(errors)

      dbEntity.findById(id).then(oldEntity => {
        if (!oldEntity) return r404({ error: 'entity not found' })
        if (oldEntity.deleted) return r404({ error: 'entity has been deleted' })
        const newEntity = new dbEntity(body)
        newEntity.save().then(info => {
          oldEntity.deleted = true
          oldEntity.save().then(() => {
            r200(info)
          }).catch(r500)
        }).catch(r500)
      }).catch(r500)
    }
  }

  this.updateReal = (options) => {

    const schema = options.schema
    const messages = options.errors
    const dbEntity = options.dbEntity

    return (req, res) => {
      const id = req.params.id
      const body = req.body
      const r200 = (...props) => options.codes['200'](req, res, ...props)
      const r400 = (...props) => options.codes['400'](req, res, ...props)
      const r404 = (...props) => options.codes['404'](req, res, ...props)
      const r500 = (...props) => options.codes['500'](req, res, ...props)

      if (!isIdValid(id)) return r404({ error: 'entity id is not valid' })

      const validation = validator(body, schema, messages)
      const valid = validation.valid
      const errors = validation.errors
      if (!valid) return r400(errors)

      dbEntity.findById(id).then(entity => {
        if (!entity) return r404({ error: 'entity not found' })
        entity.update(body)
          .then(result => {
            if (result.ok === 1) {
              console.log(result)
              r200()
            } else {
              r500({ error: 'can not update entity' })
            }
          })
          .catch(r500)
      }).catch(r500)
    }
  }

  this.readAll = (options) => {

    const dbEntity = options.dbEntity

    return (req, res) => {
      const r200 = (...props) => options.codes['200'](req, res, ...props)
      const r500 = (...props) => options.codes['500'](req, res, ...props)

      dbEntity.find().then(entities => {
        if (!entities) return r500({ error: 'entities could not be undefined' })
        r200(entities)
      }).catch(r500)
    }
  }

  this.readById = (options) => {

    const dbEntity = options.dbEntity

    return (req, res) => {
      const id = req.params.id
      const r200 = (...props) => options.codes['200'](req, res, ...props)
      const r404 = (...props) => options.codes['404'](req, res, ...props)
      const r500 = (...props) => options.codes['500'](req, res, ...props)

      if (!isIdValid(id)) return r404({ error: 'entity id is not valid' })

      dbEntity.findById(id).then(entity => {
        if (!entity) return r404({ error: 'entity not found' })
        r200(entity)
      }).catch(r500)
    }
  }

  this.deleteFake = (options) => {

    const dbEntity = options.dbEntity

    return (req, res) => {
      const id = req.params.id
      const r204 = (...props) => options.codes['204'](req, res, ...props)
      const r404 = (...props) => options.codes['404'](req, res, ...props)
      const r500 = (...props) => options.codes['500'](req, res, ...props)

      if (!isIdValid(id)) return r404({ error: 'entity id is not valid' })

      dbEntity.findById(id).then(entity => {
        if (!entity) return r404({ error: 'entity not found' })
        if (entity.deleted) return r404({ error: 'entity has been deleted' })
        entity.deleted = true
        entity.save()
          .then(r204)
          .catch(r500)
      }).catch(r500)
    }
  }

  this.deleteReal = options => {

    const dbEntity = options.dbEntity

    return (req, res) => {
      const id = req.params.id
      const r204 = (...props) => options.codes['204'](req, res, ...props)
      const r404 = (...props) => options.codes['404'](req, res, ...props)
      const r500 = (...props) => options.codes['500'](req, res, ...props)

      if (!isIdValid(id)) return r404({ error: 'entity id is not valid' })

      dbEntity.findById(id).then(entity => {
        if (!entity) return r404({ error: 'entity not found' })
        entity.remove()
          .then(r204)
          .catch(r500)
      }).catch(r500)
    }
  }

}

module.exports = new Factory()
