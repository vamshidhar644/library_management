const connection = require('../connection');

const UserTable = `
    CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    );  
`;

connection.query(UserTable, (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table created successfully');
  }
});

module.exports = UserTable;
