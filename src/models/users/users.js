const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'This email is not valid']
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  location: {
    type: String,
    required: false,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?1?\d{10}$/, 'This phone number is not valid']
  },
  role: {
    type: String,
    enum: ['administrator', 'seller'],
    default: 'administrator'
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  }
}, {
  timestamps: true
})

userSchema.plugin(mongoosePaginate)
module.exports = model('User', userSchema)
