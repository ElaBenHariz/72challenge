const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://mootez:mootez@cluster0.7jg1own.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;