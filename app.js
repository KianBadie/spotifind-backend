const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});