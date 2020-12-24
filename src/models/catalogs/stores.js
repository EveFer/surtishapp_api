const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

storeSchema.plugin(mongoosePaginate)

module.exports = model('Store', storeSchema)
