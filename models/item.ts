import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please provide a date.'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category.'],
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Please provide a type.'],
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an amount.'],
  },
  note: {
    type: String
  }
})

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);