const connection = require('../connection');

const BooksTable = `
    CREATE TABLE IF NOT EXISTS books (
        book_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        isbn VARCHAR(255) NOT NULL
    );  
`;

connection.query(BooksTable, (err) => { 
  if (err) {
    console.error('Error creating books table:', err);
  } else {
    console.log('Books table created successfully');
  }
});

module.exports = BooksTable;
