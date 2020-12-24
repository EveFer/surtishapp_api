const { Product } = require('../../models')

async function create (dataProduct, store) {
  const {
    unitMeasureMajor,
    quantityByMeasureMajor,
    quantityByMeasureMedia,
    barcode
  } = dataProduct

  const product = await Product.findOne({ barcode, store })
  console.log(product)
  if (product) throw new Error('It already a product with this barcode')

  let unitMeasureMedia = ''
  let unitMeasureMinor = ''
  let quantityByMeasureMinor = 0
  let currentQuantityByMeasureMajor = 0
  let currentQuantityByMeasureMinor = 0

  if (unitMeasureMajor === 'bulto' || unitMeasureMajor === 'pieza') {
    unitMeasureMedia = 'kilogramos'
    unitMeasureMinor = 'gramos'
    quantityByMeasureMinor = (quantityByMeasureMajor * 1000) * quantityByMeasureMedia
  }

  if (unitMeasureMajor === 'caja') {
    unitMeasureMedia = 'pieza'
    unitMeasureMinor = 'pieza'
    quantityByMeasureMinor = quantityByMeasureMajor * quantityByMeasureMedia
  }

  currentQuantityByMeasureMajor = quantityByMeasureMajor
  currentQuantityByMeasureMinor = quantityByMeasureMinor
  quantityByMeasureMinor = quantityByMeasureMajor * quantityByMeasureMedia

  return Product.create({
    ...dataProduct,
    store,
    unitMeasureMajor,
    unitMeasureMedia,
    unitMeasureMinor,
    quantityByMeasureMinor,
    currentQuantityByMeasureMajor,
    currentQuantityByMeasureMinor
  })
}

function getAll () {
  return Product.find({})
}

function getByStore (store) {
  return Product.find({ store })
}

function getById (id) {
  return Product.findById(id)
}

async function getByBarcode (barcode, store) {
  const product = await Product.findOne({ barcode, store })
  if (!product) throw new Error('No existe el Producto')
  return product
}

function deleteById (id) {
  return Product.findByIdAndRemove(id)
}

function updateById (id, newData) {
  if (newData.unitMeasureMajor && newData.quantityByMeasureMajor) {
    let unitMeasureMedia = ''
    let unitMeasureMinor = ''
    let quantityByMeasureMinor = 0
    let currentQuantityByMeasureMajor = 0
    let currentQuantityByMeasureMinor = 0

    if (newData.unitMeasureMajor === 'bulto' || newData.unitMeasureMajor === 'pieza') {
      unitMeasureMedia = 'kilogramos'
      unitMeasureMinor = 'gramos'
      quantityByMeasureMinor = (newData.quantityByMeasureMajor * 1000) * newData.quantityByMeasureMedia
    }

    if (newData.unitMeasureMajor === 'caja') {
      unitMeasureMedia = 'pieza'
      unitMeasureMinor = 'pieza'
      quantityByMeasureMinor = newData.quantityByMeasureMajor * newData.quantityByMeasureMedia
    }
    currentQuantityByMeasureMajor = newData.quantityByMeasureMajor
    currentQuantityByMeasureMinor = quantityByMeasureMinor

    return Product.findByIdAndUpdate(
      id,
      {
        ...newData,
        unitMeasureMedia,
        unitMeasureMinor,
        quantityByMeasureMinor,
        currentQuantityByMeasureMajor,
        currentQuantityByMeasureMinor
      },
      { new: true }
    )
  } else {
    return Product.findByIdAndUpdate(id, newData, { new: true })
  }
}

function addImage (id, image) {
  return Product.findByIdAndUpdate(id, image, { new: true })
}

module.exports = {
  create,
  getAll,
  getByStore,
  getById,
  deleteById,
  updateById,
  addImage,
  getByBarcode
}
