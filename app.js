const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();

const authRouter = require('./routes/auth');

const PORT = process.env.PORT || 8000;

const app = express();

// app.use(cors({
//     origin: 'https://trulyfound.netlify.app'
// }));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});