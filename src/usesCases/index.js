const stores = require('./catalogs/Stores')
const users = require('./users/users')
const clients = require('./users/clients')
const providers = require('./catalogs/providers')
const categories = require('./catalogs/categories')
const products = require('./catalogs/products')
const sales = require('./sales')

module.exports = {
  stores,
  users,
  clients,
  providers,
  categories,
  products,
  sales
}
