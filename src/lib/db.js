const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL || ''

function connect () {
  return mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}

module.exports = {
  connect
}
