const express = require("express");
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:8000/';

router.use(express.json());

router.get('/login', (req, res) => {

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: 'playlist-read-private playlist-read-collaborative',
        redirect_uri: REDIRECT_URI
    });

    res.redirect(`https://accounts.spotify.com/authorize?` + params.toString());

});

router.post('/token', (req, res) => {

    const code = req.body.code;

    const authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        }
    };

    axios.request(authOptions)
        .then((authRes) => {
            res.json(authRes.data);
        })
        .catch((err) => {
            console.log(err);
        });

});

module.exports = router;