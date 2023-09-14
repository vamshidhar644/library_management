const mysql = require('mysql2');

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vamshi!7285',
  database: 'library_management',
});

module.exports = connection;
