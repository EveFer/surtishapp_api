const { Schema, model } = require('mongoose')
const SalesTicket = require('./salesTicket')

const saleSchema = Schema({
  client: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
  seller: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  numberFolio: {
    type: String,
    trim: true,
    required: true
  },
  saleTotal: {
    type: Number,
    min: 0
  },
  moneyReceived: {
    type: Number,
    min: 0
  },
  moneyReturn: {
    type: Number,
    min: 0
  },
  salesTicket: [SalesTicket],
  store: {
    type: Schema.ObjectId,
    ref: 'Store'
  }
}, {
  timestamps: true
})

module.exports = model('Sale', saleSchema)
