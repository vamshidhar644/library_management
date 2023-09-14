const connection = require('../connection');
const moment = require('moment');

const borrowBook = async (req, res) => {
  const { book_id, user_id } = req.body;

  // Check if the book_id and user_id are provided
  if (!book_id || !user_id) {
    res.status(400).json({
      status: 'Bad request',
      status_code: 400,
      message: 'Missing required fields',
    });
    return;
  }

  // Query the database to check the availability of the book by its ID
  connection.query(
    'SELECT * FROM booksavail WHERE book_id = ?',
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
      if (book.available) {
        // Generate the issue time as the current time
        const issue_time = moment().format('YYYY-MM-DD HH:mm:ss');

        // Calculate the return time as two days from the issue time
        const return_time = moment(issue_time)
          .add(2, 'days')
          .format('YYYY-MM-DD HH:mm:ss');

        // Mark the book as booked in the database
        connection.query(
          'UPDATE booksavail SET available = false WHERE book_id = ?',
          [book_id],
          (err) => {
            if (err) {
              console.error('Error updating book availability:', err);
              res
                .status(500)
                .json({ status: 'Error occurred', status_code: 500 });
              return;
            }

            // Insert the booking record into the database
            connection.query(
              'INSERT INTO booksavail (book_id, user_id, issued, next_avail) VALUES (?, ?, ?, ?)',
              [book_id, user_id, issue_time, return_time],
              (err, results) => {
                if (err) {
                  console.error('Error inserting booking:', err);
                  res
                    .status(500)
                    .json({ status: 'Error occurred', status_code: 500 });
                  return;
                }

                res.status(200).json({
                  status: 'Book booked successfully',
                  status_code: 200,
                  booking_id: results.insertId,
                });
              }
            );
          }
        );
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

module.exports = borrowBook;
