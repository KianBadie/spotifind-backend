const express = require("express");
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const generateStateString = require('../generateStateString');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

router.use(express.json());

router.get('/login', (req, res) => {

    const state = generateStateString();

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: 'playlist-read-private playlist-read-collaborative',
        redirect_uri: REDIRECT_URI,
        state: state
    });

    res.cookie('state', state);
    res.redirect(`https://accounts.spotify.com/authorize?` + params.toString());

});

router.post('/token', (req, res, next) => {

    if(req.body.state !== req.cookies.state) {
        return res.status(500).end();
    }

    res.clearCookie('state');

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
        .catch(next);

});

module.exports = router;