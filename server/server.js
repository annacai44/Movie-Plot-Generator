<<<<<<< HEAD:server/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const apicache = require('apicache');
=======
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
const PORT = 8000;
>>>>>>> parent of e88ce6e6 (deploy to heroku):server.js

require('dotenv').config();
const PORT = process.env.PORT || 8000;
const app = express();

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 minutes
//   max: 5
// });
// app.use(limiter);
// app.set('trust proxy', 1);

app.use(express.static('client/src'));

app.use(cors());

app.get('/', (req, res) => {
    console.log(req);
    console.log(req.query.prompt);
    axios.post('https://api.openai.com/v1/completions', {
        model: "text-davinci-002",
        prompt: req.query.prompt,
        max_tokens: 256,
        temperature: parseInt(req.query.sliderValue),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }).then((response) => {
        console.log(response.data);
        res.json(response.data.choices[0].text)
      }).catch((err) => {
        console.log(err);
      })
})

// listen out to changes on our port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))