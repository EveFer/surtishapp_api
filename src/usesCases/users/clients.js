const { Client } = require('../../models')

const generateCode = require('../../lib/generateCode')

function create (dataClient, store) {
  let code = generateCode(5)
  const client = Client.findOne({ code })
  if (client) {
    code = generateCode(5)
  }
  return Client.create({ ...dataClient, store, code })
}

function getAllByStore (store) {
  return Client.find({ store })
    .select('firstName lastName code type email phone')
}

function getById (id) {
  return Client.findById(id)
    .select('firstName lastName code type email phone')
}

function updateById (id, newData) {
  return Client.findByIdAndUpdate(id, newData, { new: true })
}

function deleteById (id) {
  return Client.findByIdAndRemove(id)
}

module.exports = {
  create,
  getAllByStore,
  getById,
  updateById,
  deleteById
}
