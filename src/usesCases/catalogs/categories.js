const { Category } = require('../../models')

function create (dataCategory, store) {
  return Category.create({ ...dataCategory, store })
}

function getAll () {
  return Category.find({})
}

function getByStore (store) {
  return Category.find({ store })
}

function getById (id) {
  return Category.findById(id)
}

function deleteById (id) {
  return Category.findByIdAndRemove(id)
}

function updateById (id, newData) {
  return Category.findByIdAndUpdate(id, newData, { new: true })
}

module.exports = {
  create,
  getAll,
  getByStore,
  getById,
  deleteById,
  updateById
}
