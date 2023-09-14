const express = require('express');

const signupUser = require('../controllers/userSignup');
const loginUser = require('../controllers/userLogin');
const getBook = require('../controllers/getBook');
const getBookAvailability = require('../controllers/getBookAvailability');
const borrowBook = require('../controllers/borrowBook');

// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.get('/books/:title', getBook);

router.get('/books/:book_id/availability', getBookAvailability);

router.post('/books/borrow', borrowBook);

module.exports = router;
