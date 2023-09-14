const connection = require('../connection');

const addBook = async (req, res) => {
  const { title, author, isbn } = req.body;

  // Insert the book information into the 'books' table
  connection.query(
    'INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)',
    [title, author, isbn],
    (err, results) => {
      if (err) {
        console.error('Error inserting book:', err);
        return;
      }

      // res.status(200).json({
      //   message: 'Book added successfully',
      //   book_id: results.insertId,
      // });

      const bookId = results.insertId; 

      // Insert book_id and availability = true into the 'booksavail' table
      connection.query(
        'INSERT INTO booksavail (book_id, available) VALUES (?, ?)',
        [bookId, true],
        (err, results) => {
          if (err) {
            console.error('Error inserting book availability:', err);
            return;
          }

          res.status(200).json({
            message: 'Book added successfully',
            book_id: bookId,
          });
        }
      );
    }
  );
};

module.exports = addBook;
