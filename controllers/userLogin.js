const connection = require('../connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'vamshidhardawoorworkindialibrarymanagement'; // Replace with your own secret key

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  connection.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ status: 'Error occurred', status_code: 500 });
        return;
      }

      if (results.length === 1) {
        const user = results[0];

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            res
              .status(500)
              .json({ status: 'Error occurred', status_code: 500 });
            return;
          }

          if (passwordMatch) {
            // Passwords match, generate JWT token
            const accessToken = jwt.sign({ user_id: user.id }, JWT_SECRET);

            res.status(200).json({
              status: 'Login successful',
              status_code: 200,
              user_id: user.id,
              access_token: accessToken,
            });
          } else {
            // Incorrect password
            res.status(401).json({
              status: 'Incorrect username/password provided. Please retry',
              status_code: 401,
            });
          }
        });
      } else {
        // User not found
        res.status(401).json({
          status: 'Incorrect username/password provided. Please retry',
          status_code: 401,
        });
      }
    }
  );
};

module.exports = loginUser;
