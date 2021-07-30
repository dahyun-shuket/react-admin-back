const express = require('express');
// const jwt = require('jsonwebtoken');
const app = express();
// const mysqlPool   = require('./config/database.js');
// const authRouter = require('./router/auth');
const userRouter = require('./routes/users');
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', require('./routes/auth'));
app.listen(3333, () => {
    console.log('3333')
})

// app.get('/api/hello', (req, res) => res.send('hello'))
module.exports = app;