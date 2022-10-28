const express = require('express');
require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const PORT = process.env.PORT || 8000;

const app = express();

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});