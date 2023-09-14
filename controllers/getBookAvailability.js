const connection = require('../connection');

const getBookAvailability = async (req, res) => {
  const { book_id } = req.params;

  // Check if the book_id and user_id are provided
  if (!book_id) {
    res.status(400).json({
      status: 'Bad request',
      status_code: 400,
      message: 'Missing required fields',
    });
    return;
  }

  // Query the database to check the availability of the book by its ID
  connection.query(
    'SELECT * FROM books WHERE book_id = ?',
    [book_id],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ status: 'Error occurred', status_code: 500 });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ status: 'Book not found', status_code: 404 });
        return;
      }

      const book = results[0];

      // Check if the book is available
      if (!book.available) {
        res.status(400).json({
          book_id: book.book_id,
          title: book.title,
          author: book.author,
          available: 'true',
        });
      } else {
        // Book is already booked
        res.status(400).json({
          status: 'Book is not available at this moment',
          status_code: 400,
        });
      }
    }
  );
};

module.exports = getBookAvailability;
