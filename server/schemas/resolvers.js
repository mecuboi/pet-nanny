const { AuthenticationError } = require('apollo-server-express');
const { User, Booking, Order} = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    all: async () => {
      return await User.find();
    },
    users: async () => {
      return await User.find({ role: 'User' });
    },
    user: async (_, args) => {
      return await User.findOne({ _id: args.id, role: 'User'});
    },
    nannies: async () => {
      return await User.find({ role: 'Nanny'});
    },
    nanny: async (_, args) => {
      return await User.findOne({ _id: args.id, role: 'Nanny'});
    },
    orders: async () => {
      return await Order.find().populate('bookings');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.bookings',
          populate: 'bookings'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    bookings: async () => {
      return await Booking.find().populate('user');
    },
    booking: async (parent, {_id}, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'bookings.bookedBy',
          populate: 'bookedBy'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ bookings: args.bookings });
      const line_items = [];

      const { bookings } = await order.populate('bookings');

      for (let i = 0; i < bookings.length; i++) {
        const product = await stripe.products.create({
          name: bookings[i].name,
          description: bookings[i].description,
          images: [`${url}/images/${bookings[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: bookings[i].price * 100,
          currency: 'aud',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteUser: async(parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndRemove(context.user._id)
      }

      throw new AuthenticationError('Not logged in');
    },
    addOrder: async (parent, {  bookings }, context) => {
      if (context.user) {
        const order = new Order({ bookings });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteOrder: async (parent, {_id, bookings }, context) => {
      if (context.user) {

        const order = await Order.findById(_id)

        -
        await User.findByIdAndUpdate(context.user._id, { $pull: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateBooking: async (parent, { _id, BookedDate }) => {

      return await Product.findByIdAndUpdate(_id, { BookedDate }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
