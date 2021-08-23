const express = require('express');
// const jwt = require('jsonwebtoken');
const app = express();
// const mysqlPool   = require('./config/database.js');
// const authRouter = require('./router/auth');
const userRouter = require('./routes/users');
const martRouter = require('./routes/mart');
const cors = require('cors');
const path = require('path');
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// const uploads = multer({ dest: './upload', limits: { fileSize: 5 * 1024 * 1024 } });

// // INSERT INTO USERTABLE(LOGINID, PWD, USERTYPE, CREATED,MODIFIED, ACTIVE) VALUES (?,?,?,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP(),'Y')

// app.post('/api/mart/fdf',  (req, res) => {

// let sql = `INSERT INTO MART (NAME, REGNO, ADDRESS, CONTACT, CREATED, MODIFIED, ACTIVE) VALUES (?,?,?,?,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP(),'Y')`;

// let name = req.body.NAME;

// // let logofile = `/image/${req.file.LOGOFILE}`;

// let regno = req.body.REGNO;

// let address = req.body.ADDRESS;

// let contact = req.body.CONTACT;

// let params = [name, regno, address, contact];

// pool.query(sql, params,
// (err, rows, fields) => {
// res.send(rows);
// })

// });


app.use('/api/files', require('./routes/files'));
app.use('/api/scrap', require('./routes/scrap'));
app.use('/api/news', require('./routes/news'));
app.set('mediaPath', require('./config/env').mediaPath);
// app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/mart', martRouter);
app.listen(3333, () => {
    console.log('3333')
})

// app.get('/api/hello', (req, res) => res.send('hello'))
module.exports = app;