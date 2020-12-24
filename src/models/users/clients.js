const { Schema, model } = require('mongoose')

const clientSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    unique: false
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?1?\d{10}$/, 'This phone number is not valid']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    require: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'This email is not valid']
  },
  type: {
    type: String,
    enum: ['general', 'preference']
  },
  store: {
    type: Schema.ObjectId,
    ref: 'Store'
  }
}, {
  timestamps: true
})

module.exports = model('Client', clientSchema)
