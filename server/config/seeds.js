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
      // bookings: [
      //   { BookedDate: '20 Jan 2023', BookedBy:  savedUser1._id},
      //   { BookedDate: '21 Jan 2023', BookedBy:  savedUser1._id},
      // ]
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
    // bookings: [
    //   { BookedDate: '22 Jan 2023', BookedBy: anon._id.toString() },
    //   { BookedDate: '23 Jan 2023', BookedBy: anon._id.toString() },
    // ]
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
    // bookings: [
    //   { BookedDate: '24 Jan 2023', BookedBy: catdog._id.toString()  },
    //   { BookedDate: '25 Jan 2023', BookedBy: catdog._id.toString() },
    // ]
  });

  await User.create({
    firstName: "Tom",
        lastName: "Cruise",
        email: "Iamtom@test.com",
        password: "Password12345",
        address: "78 Campbells River Road, Warrigal NSW",
        postcode: "2825",
        role: "Nanny",
        picture:"http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRezb3QSPGhLptNSXoqUpKeVofpNCTLPXOG9n9o3Z2bnMp80f2AimK17SPKLa2PPkqsYkqIUAHfDgZFTs0",
        description: "Huge dog lover. I feel sorry for people who don't have dogs. I hear they have to pick up food they drop on the floor",

  });

  await User.create({
    firstName: "Will",
        lastName: "smith",
        email: "Freshprince@halleluja.com",
        password: "Password12345",
        address: "10 Cornish Street, Laverton VIC",
        postcode: "3028",
        role: "Nanny",
        picture:"https://media.gq-magazine.co.uk/photos/62442745b63bdfb22a904ed7/master/pass/290322_CRWS_hp.jpg",
        description: "I love my cats however they can always work out mathematically the exact place to sit that will cause the most inconvinience.",
       
  });

  await User.create({
    firstName: "Taylor",
    lastName: "Swift",
    email: "whytaylor@test.com",
    password: "Password12345",
    address: " 92 Capper Street, Penwhaupell QLD",
    postcode: "4625",
    role: "User",
    description: "I ain't no nanny"
    
  });

  await User.create({
    firstName: "Britney",
        lastName: " Spears ",
        email: "popqueen@forreal.com",
        password: "Password12345",
        address: "33 Benny Street, Quoiba Tas",
        postcode: "7310",
        role: "Nanny",
        description: "I occasionally enjoy a sing along with my pet parrot",
        
  });

  await User.create({
    firstName: "Dwayne",
    lastName: "Johnson",
    email: "Drock@mymail.com",
    password: "Password12345",
    address: "4 Wollombi street, Dunolly NSW",
    postcode: "2330",
    role: "Nanny",
    picture:"https://assets.teenvogue.com/photos/59d3b74cc5559f37a703150c/3:2/w_2411,h_1607,c_limit/MCDMOAN_EC058.jpg",
    description: "I have extensive experience in the wild. I am able to engage with all sorts of exotic pets.",
    
  });
  
  console.log('users seeded');te(
  //   { email: 'anon@testmail.com' },
  //   { $push: { orders: { bookings: [bookings[2]._id, bookings[3]._id] } } }
  // );
  // await User.findOneAndUpdate(
  //   { email: 'catdog@testmail.com' },
  //   { $push: { orders: { bookings: [bookings[4]._id, bookings[5]._id] } } }
  // );


  // const bookings = await Booking.find({});

  // await User.findOneAndUpdate(
  //   { email: 'steve@testmail.com' },
  //   { $push: { orders: { bookings: [bookings[0]._id, bookings[1]._id] } } }
  // );
  // await User.findOneAndUpda
  // console.log('orders seeded');

  process.exit();
});
