const mongoose = require('mongoose')

module.exports = str => {
  return mongoose.Types.ObjectId.isValid(str)
}
