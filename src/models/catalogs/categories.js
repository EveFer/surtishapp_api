const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  store: {
    type: Schema.ObjectId,
    ref: 'Store'
  }
}, {
  timestamps: true
})

module.exports = model('Category', categorySchema)
