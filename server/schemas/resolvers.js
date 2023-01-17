const { AuthenticationError } = require('apollo-server-express');
const { User, Booking, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51MQpZQCIw6RfRCJYsWbRBGrgYW5YVwMK5ml5wRXASIFbJJEMGXObq31rAx0tZ2dDqZgF4We6nNfaA2ICrGzYck7100zSZKYleX');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({
          _id: context.user._id
        })

        return userData
      }

      throw new AuthenticationError('Not logged in')
    },
    all: async () => {
      return await User.find()
    },
    users: async () => {
      return await User.find({ role: 'Pawrent' });
    },
    user: async (_, { profileId }) => {
      return await User.findOne({ _id: profileId });
    },
    nannies: async () => {
      return await User.find({ role: 'Nanny' });
    },
    nanny: async (_, args) => {
      return await User.findOne({ _id: args.id, role: 'Nanny' });
    },
    orders: async () => {
      return await Order.find().populate("bookings")

    },
    userOrder: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.bookings',
          populate: 'bookings'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },

    singleOrder: async (__, { _id }, context) => {
      if (context.user) {
        return await Order.findById(_id).populate("bookings")
      }
    },

    bookings: async () => {
      return await Booking.find().populate('user');
    },
    userBooking: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'bookings.bookedBy',
          populate: 'bookedBy'
        });

        return user.bookings.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },

    singleBooking: async (parent, { _id }, context) => {
      if (context.user) {
        const booking = await Booking.findById(_id).populate({
          path: 'bookings.bookedBy',
          populate: 'bookedBy'
        });

        return booking
      }

      throw new AuthenticationError('Not logged in');
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const newBooking = new Booking({
        bookedDate: args.bookedDate,
        price: args.price,
        bookedBy: context.user._id
      })
      const newOrder = new Order({ bookings: newBooking });


      const product = await stripe.products.create({
        name: `Order Number: ${newOrder._id}`,
        description: "Nanny whole day booking"
      })

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: newBooking.price * 100,
        currency: 'aud'
      });

      const line_items = [
        {
          price: price.id,
          quantity: 1
        }
      ];

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
        const updatedUser = await User.findByIdAndUpdate(context.user._id, args, { new: true })

        return updatedUser;
        // const { picture } = args;
        // const pictureBuffer = new Buffer.from(picture.split(',')[1], 'base64');
        // args.picture = pictureBuffer;
        // return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndRemove(context.user._id)
      }

      throw new AuthenticationError('Not logged in');
    },
    addOrder: async (parent, { bookings, nanny }, context) => {
      if (context.user) {
        const order = new Order({ bookings });
        await order.save();
        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order
      }
      throw new AuthenticationError('Not logged in');
    },
    deleteOrder: async (parent, { _id, bookingId }, context) => {
      if (context.user) {
        const order = await Order.findByIdAndDelete(_id)
        await User.findByIdAndUpdate(context.user._id, { $pull: { orders: { _id: _id } } });
        await Booking.findByIdAndDelete(bookingId)
        if (!order) {
          throw new Error('Order not found');
        }
        return { message: 'Order deleted' };
      }
      throw new AuthenticationError('Not logged in');
    },
    addBooking: async (parent, args, context) => {
      if (context.user) {
        // make sure that the BookedBy field is populated with the current user's id
        args.bookedBy = context.user._id;
        const booking = await Booking.create(args);

        const order = await Order.create({ bookings: booking._id })

        return { booking, order };
      }
      throw new AuthenticationError('Not logged in');
    },
    updateBooking: async (parent, { _id, bookedDate }, context) => {
      if (context.user) {
        const booking = await Booking.findByIdAndUpdate(_id, { bookedDate }, { new: true });
        return booking;
      }
      throw new AuthenticationError('Not logged in');
    },

    // Do not use first
    deleteBooking: async (parent, { _id }, context) => {
      if (context.user) {
        const booking = await Booking.findByIdAndDelete(_id);
        await User.findByIdAndUpdate(context.user._id, { $pull: { bookings: { _id: _id } } });

        if (!booking) {
          throw new Error('Booking not found');
        }

        return { message: 'Booking deleted' };
      }
      throw new AuthenticationError('Not logged in');
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
