require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 3800;
const mongoString = process.env.DATABASE_URL;

app.use(express.json({ limit: '10mb' }));

app.use(
    cors({
        origin: '*',
        exposedHeaders: 'x-auth-token',
    })
);

mongoose.connect(mongoString);
const db = mongoose.connection;
db.on('error', (error) => console.log('db connection err: ', error));
db.once('open', () => console.log('mongoose connected'));

app.use('/', indexRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`mit-homes server live on port ${port}`);
});
