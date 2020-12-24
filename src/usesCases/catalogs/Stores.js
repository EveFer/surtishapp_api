const { Store } = require('../../models')

function create (dataStore) {
  return Store.create(dataStore)
}

function getAll (page, perPage) {
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage) || 10
  }
  return Store.paginate({}, options)
}

function getById (id) {
  return Store.findById(id)
}

function deleteById (id) {
  return Store.findByIdAndRemove(id)
}

function updateById (id, newData) {
  return Store.findByIdAndUpdate(id, newData, { new: true })
}

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  updateById
}
