const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
