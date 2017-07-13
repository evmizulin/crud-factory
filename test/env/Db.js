const mongoose = require('mongoose')
const log = console.log.bind(console)

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection

db.on('error', (err) => {
  log('connection error', err)
})

db.once('open', () => {
  log('Connected to DB!')
})

const Schema = mongoose.Schema

const User = new Schema({
  name: { type: String },
  phone: { type: String }
})

module.exports = {
  user: mongoose.model('User', User)
}
