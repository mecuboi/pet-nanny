const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const User = require('./models/User');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage,
  limits: {
    fileSize: 50000000 // 50MB
} });

//  const updateUserPicture = require('./schemas/resolvers')

const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.post('/upload', upload.single('picture'), async (req, res, next) => {
  // const token = req.headers.authorization;
  try {
      // const decoded = jwt.verify(token, 'mysecretsshhhhh');
      const userId = req.body.userId;
      const file = req.file;
      const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { picture: req.body.picture },
          { new: true }
      );
  } catch (err) {
      console.log(err);
      res.status(401).send({ message: "Unauthorized" });
  }
  next();
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
