const { Provider } = require('../../models')

function create (dataProvider, store) {
  return Provider.create({ ...dataProvider, store })
}

function getAll () {
  return Provider.find({})
}

function getByStore (store) {
  return Provider.find({ store })
}

function getById (id) {
  return Provider.findById(id)
}

function deleteById (id) {
  return Provider.findByIdAndRemove(id)
}

function updateById (id, newData) {
  return Provider.findByIdAndUpdate(id, newData, { new: true })
}

module.exports = {
  create,
  getById,
  getAll,
  getByStore,
  deleteById,
  updateById
}
