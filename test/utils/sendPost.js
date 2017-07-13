const request = require('request')
const mlog = require('mocha-logger')

module.exports = (url, body, cb) => {
  const aUrl = `http://localhost:8080${url}`
  mlog.log(`sending post request to ${aUrl}`)
  request({
    uri: aUrl,
    method: 'POST',
    json: true,
    headers: {
      "content-type": "application/json",
      'Origin': 'http://localhost:8080'
    },
    body: body
  }, cb)
}
