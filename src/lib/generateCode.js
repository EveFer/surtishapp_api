const crypto = require('crypto')
// const { Client } = require('../models')

function generateCode (lengthString) {
  const code = crypto.randomBytes(lengthString).toString('hex')
  //   const client = Client.findOne({ code })
  //   if (client) {
  //     generateCode(lengthString)
  //   }
  return code
}

module.exports = generateCode
