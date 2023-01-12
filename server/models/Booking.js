// FOR NANNIES

const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingSchema = new Schema({
  CreatedAt: {
    type: Date,
    default: Date.now()
  },
  // https://mongoosejs.com/docs/tutorials/dates.html Doc about type: Date
  BookedDate: {
    type: Date,
    get: value => moment(value).format("DD MMM YYYY"),
    // the minimum the date can be in 11 Jan 2023.
    min: Date.now()
  },
  price: {
    type: Number,
    default: 100,
    required: true,
  },
   BookedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

bookingSchema.methods.getBookedDate = () => {
  return bookingSchema.BookedDate
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
