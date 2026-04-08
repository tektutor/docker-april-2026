const express = require('express');
const mysql = require('mysql2');
const app = express();

// 1. Create a connection pool
const pool = mysql.createPool({
  host: '172.17.0.2',
  user: 'root',      // Replace with your MySQL username
  password: 'root@123', // Replace with your MySQL password
  database: 'tektutor',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 2. Define the route to fetch and display data
app.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send('Database error: ' + err.message);
    }

    // 3. Build a simple HTML table to show in the browser
    let html = '<h1>User List</h1><table border="1"><tr><th>ID</th><th>Name</th><th>Email</th></tr>';
    
    results.forEach(user => {
      html += `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
              </tr>`;
    });

    html += '</table>';
    res.send(html);
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
