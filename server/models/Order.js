// FOR USERS

const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now()
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Booking'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
