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
    address: '312 Vaucluse road, Vaucluse',
    postcode: '2029',
    role: 'Pawrent'
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
    address: '245 Cherry street, Orange',
    postcode: '3030'
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
    picture:"https://assets.teenvogue.com/photos/59d3b74cc5559f37a703150c/3:2/w_2411,h_1607,c_limit/MCDMOAN_EC058.jpg",
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
      address: '35 Cloud Street, Cheetah',
      postcode: '4023',
      picture:"https://www.indiewire.com/wp-content/uploads/2015/04/dakota-fanning-by-daniel-bergeron.jpg?w=780",
      role: 'Nanny',
      description: 'I think my record is walking 13 dogs at once, that was fun'
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
    address: '65 Above Highway',
    picture:"https://images.thedirect.com/media/article_full/capagent_1.jpg",
    role: 'Nanny',
    description:'Does it look like I have time for your pets? I am saving the world'
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
    address: '15 High Avenue',
    picture:"https://assets.teenvogue.com/photos/59d3b74cc5559f37a703150c/3:2/w_2411,h_1607,c_limit/MCDMOAN_EC058.jpg",
    role: 'Nanny',
    description: 'hmmmmmmm...............................'
    // bookings: [
    //   { BookedDate: '24 Jan 2023', BookedBy: catdog._id.toString()  },
    //   { BookedDate: '25 Jan 2023', BookedBy: catdog._id.toString() },
    // ]
  });

  await User.create({
    firstName: "Tom",
        lastName: "Holland",
        email: "Iamtom@test.com",
        password: "Password12345",
        address: "78 Campbells River Road, Warrigal NSW",
        postcode: "2825",
        role: "Nanny",
        picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMneUFqjkV025L2OrZSvqG8KxCIJaSM0Q9bQ&usqp=CAU",
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
        picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThIoZ_VxZ9NkHTz-iqtdWU4Qq8CN6iHHP6wg&usqp=CAU",
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
  
  console.log('users seeded');
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
