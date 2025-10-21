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

app.post('/api/mahasiswa', (req, res) => {
    const { nama, nim, kelas, prodi } = req.body;

    if (!nama || !nim || !kelas || !prodi) {
        return res.status(400).json({massage:'nama, nim, kelas, and prodi wajib diisi'});
    }

    db.query('INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)', 
        [nama, nim, kelas, prodi], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err.stack);
            return res.status(500).json({massage:'Error inserting data'});
        }   
        res.status(201).json({massage:'Data mahasiswa berhasil ditambahkan', id: result.insertId});
    });
}); 

app.delete('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;       
    db.query('DELETE FROM mahasiswa WHERE id = ?', [userId], (err, result) => {
        if (err) {      
                console.error(err);
                return res.status(500).json({massage:'Database error'});
        }                   
        res.json({massage:'Data mahasiswa berhasil dihapus'});
    }       
    );

});