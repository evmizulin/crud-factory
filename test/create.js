const send = require('./utils/sendPost')

describe('Init', () => {})

module.exports = new Promise((resolve, reject) => {

  describe('Create', () => {

    it('should save without errors', done => {
      send('/users', { name: 'Evgeny', phone: '123456' }, (err, resp, body) => {
        done
      })
    })

  })

})
