const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const connection = require('./connection');
const UserTable = require('./tables/userTable');
const BooksTable = require('./tables/books');
const BooksAvailabilityTable = require('./tables/booksAvailability');

const app = express();
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');

    UserTable;

    BooksTable;

    BooksAvailabilityTable;
  });
  console.log(`Server is running on port ${PORT}`);
});
