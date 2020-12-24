const { Schema, model } = require('mongoose')

const productSchema = Schema({
  barcode: {
    type: String,
    trim: true,
    required: false
  },
  name: {
    type: String,
    trim: true,
    require: true
  },
  detail: {
    type: String,
    trim: true,
    require: false
  },
  image: {
    type: String,
    trim: true,
    require: false
  },
  unitMeasureMajor: {
    type: String,
    trim: true,
    require: true,
    enum: ['pieza', 'bulto', 'caja']
  },
  quantityByMeasureMajor: {
    type: Number,
    required: true,
    min: 0
  },
  unitMeasureMedia: {
    type: String,
    trim: true,
    require: true,
    enum: ['pieza', 'kilogramos']
  },
  quantityByMeasureMedia: {
    type: Number,
    required: true,
    min: 0
  },
  unitMeasureMinor: {
    type: String,
    trim: true,
    require: true,
    enum: ['pieza', 'gramos']
  },
  quantityByMeasureMinor: {
    type: Number,
    required: true,
    min: 0
  },
  stockMaxByMeasureMajor: {
    type: Number,
    required: false,
    min: 0
  },
  stockMinByMeasureMajor: {
    type: Number,
    required: false,
    min: 0
  },
  stockMaxByMeasureMinor: {
    type: Number,
    required: false,
    min: 0
  },
  stockMinByMeasureMinor: {
    type: Number,
    required: false,
    min: 0
  },
  currentQuantityByMeasureMinor: {
    type: Number,
    required: true,
    min: 0
  },
  currentQuantityByMeasureMajor: {
    type: Number,
    required: true,
    min: 0
  },
  pricePurchasedByUnit: {
    type: Number,
    required: false,
    min: 0
  },
  percentageOfProfit: {
    type: Number,
    required: false,
    min: 0
  },
  priceSuggestedByUnit: {
    type: Number,
    required: false,
    min: 0
  },
  dateOfExpiry: {
    type: Date,
    required: true
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  provider: {
    type: Schema.ObjectId,
    ref: 'Provider'
  },
  store: {
    type: Schema.ObjectId,
    ref: 'Store'
  }
}, {
  timestamps: true
})

module.exports = model('Product', productSchema)
