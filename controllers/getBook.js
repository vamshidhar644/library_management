const connection = require('../connection');

const getBook = async (req, res) => {
  const { title: searchQuery } = req.params;

  // Check if the search query is provided
  if (!searchQuery) {
    res.status(400).json({
      status: 'Bad request',
      status_code: 400,
      message: 'Search query is required',
    });
    return;
  }

  // Use SQL LIKE operator to search for books with titles containing the search query
  connection.query(
    'SELECT * FROM books WHERE title LIKE ?',
    [`%${searchQuery}%`],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ status: 'Error occurred', status_code: 500 });
        return;
      }

      const books = results.map((book) => ({
        book_id: book.book_id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
      }));

      res.status(200).json({ results: books });
    }
  );
};

module.exports = getBook;
