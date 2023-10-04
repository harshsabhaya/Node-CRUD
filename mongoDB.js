const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_LOCAL_URI, {
      dbName: 'RestApi',
      // user: process.env.DB_USER,
      // pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Mongoose connected');
    })
    .catch((err) => console.error('errerr', err));

  mongoose.connection.on('connected', () =>
    console.log('Mongoose connected to db...')
  );

  mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error.message);
  });

  mongoose.connection.on('disconnected', () =>
    console.log('Mongoose disconnected to db...')
  );

  process.on('SIGINT', () => {
    mongoose.connection.close(true);
  });
};
