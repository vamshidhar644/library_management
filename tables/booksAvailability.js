const connection = require('../connection');

const BooksAvailabilityTable = `
    CREATE TABLE IF NOT EXISTS booksAvail (
        book_id INT,
        available BOOLEAN,
        user_id VARCHAR(255),
        issued VARCHAR(255),
        next_avail VARCHAR(255)
    );  
`;

connection.query(BooksAvailabilityTable, (err) => {
  if (err) {
    console.error('Error creating availability table:', err);
  } else {
    console.log('Availability table created successfully');
  }
});

module.exports = BooksAvailabilityTable;
