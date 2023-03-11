require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const propertyRouter = require('./routes/property');
const builderRouter = require('./routes/builder');
const fileRouter = require('./routes/file');
const resellerRouter = require('./routes/reseller');

const app = express();
const port = process.env.PORT || 3800;
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const db = mongoose.connection;
db.on('error', (error) => console.log('db connection err: ', error));
db.once('open', () => console.log('mongoose connected'));

app.use(
    cors({
        origin: '*',
        exposedHeaders: 'x-auth-token',
    })
);
app.use(express.json({ limit: '10mb' }));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/property', propertyRouter);
app.use('/api/builder', builderRouter);
app.use('/api/file', fileRouter);
app.use('/api/reseller', resellerRouter);

app.listen(port, () => {
    console.log(`mit-homes server live on port ${port}`);
});
