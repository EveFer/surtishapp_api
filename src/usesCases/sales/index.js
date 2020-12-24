const { Sale, Client } = require('../../models')
const generateCode = require('../../lib/generateCode')

async function create (dataSale, store, seller) {
  let numberFolio = generateCode(5)
  const sale = Sale.findOne({ numberFolio })
  if (sale) {
    numberFolio = generateCode(5)
  }

  const client = await Client.findOne({ type: 'general' })
  const { products } = dataSale
  const productsUnique = products.reduce((hash, product) => {
    const { barcode } = product
    const count = hash[barcode]
      ? hash[barcode] + 1
      : 1

    return {
      ...hash,
      [barcode]: count
    }
  }, {})
  const order = Object.entries(productsUnique).map(([key, count]) => {
    const itemData = products.find(product => product.barcode === key)
    return {
      product: itemData._id,
      productName: itemData.name,
      barcode: itemData.barcode,
      quantityProduct: count,
      unitPrice: itemData.priceSuggestedByUnit,
      priceTotal: count * itemData.priceSuggestedByUnit
    }
  })

  const saleTotal = order.reduce((suma, item) => suma + item.priceTotal, 0)
  return Sale.create({ ...dataSale, store, client, seller, saleTotal, numberFolio, salesTicket: order })
}

function getAll () {
  return Sale.find({})
}

function getByStore (store) {
  return Sale.find({ store })
    .populate({ path: 'client', select: 'firstName lastName' })
    .populate({ path: 'seller', select: 'firstName lastName' })
}

function getById (id) {
  return Sale.findById(id)
}

function deleteById (id) {
  return Sale.findByIdAndRemove(id)
}

function updateById (id, newData) {
  return Sale.findByIdAndUpdate(id, newData, { new: true })
}

module.exports = {
  create,
  getAll,
  getByStore,
  getById,
  deleteById,
  updateById
}
