const express = require('express');
const addBook = require('../controllers/addBook');

// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/books/create', addBook);

module.exports = router;
