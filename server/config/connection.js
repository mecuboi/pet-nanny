const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pet-nanny', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
