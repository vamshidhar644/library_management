const connection = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // For generating random user IDs

const JWT_SECRET = 'vamshidhardawoorworkindialibrarymanagement'; // Replace with your own secret key

const signupUser = async (req, res) => {
  const { username, password, email } = req.body;

  // Hash the password before storing it
  try {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if the user already exists
    connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (err, results) => {
        if (err) {
          console.error('Database error:', err);
          res.status(500).json({ status: 'Error occurred', status_code: 500 });
          return;
        }

        if (results.length > 0) {
          // User with the same username already exists
          const existingUser = results[0];
          res.status(400).json({
            status: 'Username already exists',
            status_code: 400,
            user_id: existingUser.id,
          });
        } else {
          // Generate a unique user ID (you can use UUID or any other method)
          const userId = uuidv4();

          // Insert the new user with the hashed password into the database
          connection.query(
            'INSERT INTO users (user_id, username, password, email) VALUES (?, ?, ?, ?)',
            [userId, username, hashedPassword, email],
            async (err) => {
              if (err) {
                console.error('Database error:', err);
                res
                  .status(500)
                  .json({ status: 'Error occurred', status_code: 500 });
                return;
              }

              // Create a JWT token for the user
              const token = jwt.sign({ userId, username }, JWT_SECRET, {
                expiresIn: '1h',
              });

              res.status(200).json({
                status: 'Account successfully created',
                status_code: 200,
                user_id: userId,
              });
            }
          );
        }
      }
    );
  } catch (error) {
    console.error('Password hashing error:', error);
    res.status(500).json({ status: 'Error occurred', status_code: 500 });
  }
};

module.exports = signupUser;
