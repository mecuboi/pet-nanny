const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingSchema = new Schema({
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  // https://mongoosejs.com/docs/tutorials/dates.html Doc about type: Date
  BookedDate: {
    type: Date,
    // YYYY-MM-DD Format
    // the minimum the date can be in 1st Jan 2023.
    min: Date.now()
  },
  // BookedBy
   User: {
    type:Schema.Types.ObjectId,
    ref: 'User'
  },
});

bookingSchema.methods.getBookedDate = () => {
  return bookingSchema.BookedDate
};

const Booking = mongoose.model('Order', bookingSchema);

module.exports = Booking;
