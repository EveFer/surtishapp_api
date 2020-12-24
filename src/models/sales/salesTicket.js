const { Schema } = require('mongoose')

const saleSticketSchema = Schema({
  product: {
    type: Schema.ObjectId,
    ref: 'Product'
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  barcode: {
    type: String,
    trim: true,
    required: true
  },
  quantityProduct: {
    type: Number,
    required: true,
    min: 0
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  priceTotal: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
})

module.exports = saleSticketSchema
