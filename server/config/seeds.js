const db = require('./connection');
const { Booking, Order, User } = require('../models');
const getQuotedString  = require('../utils/helpers');

db.once('open', async () => {
  await Booking.deleteMany();


  // const bookings = await Booking.insertMany([
  //   { BookedDate: '02 Jan 2023', BookedBy: 1 },
  //   { BookedDate: '01 Jan 2023', BookedBy: 2 },
  //   { BookedDate: '03 Jan 2023', BookedBy: 3 },
  //   { BookedDate: '04 Jan 2023', BookedBy: 4 },
  //   { BookedDate: '05 Jan 2023', BookedBy: 5 },
  //   { BookedDate: '06 Jan 2023', BookedBy: 6 },
  // ]);

  // console.log('booking seeded'); 


  await Order.deleteMany();

  await User.deleteMany();

  // Users
  const user1 = await User.create({
    firstName: 'Steve',
    lastName: 'Legend',
    email: 'steve@testmail.com',
    password: 'password12345',
    address: 'somewhere',
    // orders: [
    //   {
    //     bookings: [bookings[0]._id, bookings[1]._id]
    //   }
    // ]
  });

  const savedUser1 = user1.save()

  await User.create({
    firstName: 'Anon',
    lastName: 'Peeps',
    email: 'anon@testmail.com',
    password: 'password12345',
    address: 'over',
    // orders: [
    //   {
    //     bookings: [bookings[2]._id, bookings[3]._id]
    //   }
    // ]
  });

  await User.create({
    firstName: 'Cat',
    lastName: 'Dog',
    email: 'catdog@testmail.com',
    password: 'password12345',
    address: 'rainbow',
    // orders: [
    //   {
    //     bookings: [bookings[4]._id, bookings[5]._id]
    //   }
    // ]
  });

  // Nannies

  const steve = await User.findOne({ email: 'steve@testmail.com' });
  if (!steve) throw new Error('User not found');

  // console.log('steve', steve._id.toString())
  
  await User.create({
      firstName: 'Fanny',
      lastName: 'Ishere',
      email: 'fanny@testmail.com',
      password: 'password12345',
      address: 'clouds',
      role: 'Nanny',
      bookings: [
        { BookedDate: '20 Jan 2023', BookedBy:  savedUser1._id},
        { BookedDate: '21 Jan 2023', BookedBy:  savedUser1._id},
      ]
    });

    const anon = await User.findOne({ email: 'anon@testmail.com' });
    if (!anon) throw new Error('User not found');

 await User.create({
    firstName: 'Nanny',
    lastName: 'Washere',
    email: 'nanny@testmail.com',
    password: 'password12345',
    address: 'above',
    role: 'Nanny',
    bookings: [
      { BookedDate: '22 Jan 2023', BookedBy: anon._id.toString() },
      { BookedDate: '23 Jan 2023', BookedBy: anon._id.toString() },
    ]
  });


  const catdog = await User.findOne({ email: 'catdog@testmail.com' });
  if (!catdog) throw new Error('User not found');

 await User.create({
    firstName: 'Janny',
    lastName: 'Nothere',
    email: 'Janny@testmail.com',
    password: 'password12345',
    address: 'high',
    role: 'Nanny',
    bookings: [
      { BookedDate: '24 Jan 2023', BookedBy: catdog._id.toString()  },
      { BookedDate: '25 Jan 2023', BookedBy: catdog._id.toString() },
    ]
  });

  console.log('users & bookings seeded');

  // const bookings = await Booking.find({});

  // await User.findOneAndUpdate(
  //   { email: 'steve@testmail.com' },
  //   { $push: { orders: { bookings: [bookings[0]._id, bookings[1]._id] } } }
  // );
  // await User.findOneAndUpdate(
  //   { email: 'anon@testmail.com' },
  //   { $push: { orders: { bookings: [bookings[2]._id, bookings[3]._id] } } }
  // );
  // await User.findOneAndUpdate(
  //   { email: 'catdog@testmail.com' },
  //   { $push: { orders: { bookings: [bookings[4]._id, bookings[5]._id] } } }
  // );

  // console.log('orders seeded');

  process.exit();
});
