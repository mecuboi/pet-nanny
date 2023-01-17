// FOR NANNIES

const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  // https://mongoosejs.com/docs/tutorials/dates.html Doc about type: Date
  bookedDate: {
    type: Date,
    // get: value => moment(value).format("DD MMM YYYY"),
    // the minimum the date can be in 11 Jan 2023.
    min: Date.now()
  },
  price: {
    type: Number,
    default: 100,
    required: true,
  },
   bookedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  additionalNotes: {
    type: String,
  }
});

bookingSchema.methods.getBookedDate = () => {
  return bookingSchema.BookedDate
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
