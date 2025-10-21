const express = require('express');
let mysql = require('mysql');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'haris0912',
  database: 'biodata',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL:', err.stack);
    return;
  }
  console.log('Connection Succesfully!');
});

app.get('/biodata', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) {
        console.error('Error fetching data:', err.stack);
        res.status(500).send('Error fetching data');
        return;
    }
    res.json(results);
  });
});