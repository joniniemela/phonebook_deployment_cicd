const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

/* global process */
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    minlength: 3,
  }, number: {
    type: String,
    validate: { validator: function(v) {return /^(?:\d{2}|\d{3})-\d+$/.test(v)}, message: props => `${props.value} is not a valid phone number!` },
    required: [true, 'Phone number is required'],
    minlength: 3,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)