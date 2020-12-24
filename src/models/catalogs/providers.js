const { Schema, model } = require('mongoose')

const providerSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  contact: {
    type: String,
    trim: true,
    required: false
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?1?\d{10}$/, 'This phone number is not valid']
  },
  daysOfVisit: [{
    type: String,
    enum: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    required: false
  }],
  store: {
    type: Schema.ObjectId,
    ref: 'Store'
  }
}, {
  timestamps: true
})

module.exports = model('Provider', providerSchema)
