const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Booking = require('./Booking');

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
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  address: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
    default: 3001
  },
  picture: {
    type: String,
    required: false,
    default:'https://images.unsplash.com/face-springmorning.jpg?q=80&fm=jpg&crop=faces&fit=crop&h=128&w=128',
  },
  description: {
    type: String,
    required: false,
    default: `I am a new User`
  },
  role: {
    type: String,
    required: true,
    default: 'User'
  },
  orders: [Order.schema],
  bookings: [Booking.schema],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// userSchema.pre('save', async function(next) {
//   User.findByIdAndUpdateAsync({_id: 'entityId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
//     // console.log("...count: "+JSON.stringify(count));
//     this.sort = count.seq;
//     next();
// })
// .catch(function(error) {
//     console.error("counter error-> : "+error);
//     throw error;
// });
// })

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
