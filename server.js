const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const apicache = require('apicache');

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

app.use(cors());

app.get('/cool', (req, res) => {
  res.send('HI.')
})

app.get('/', (req, res) => {
  res.json(process.env.OPENAI_API_KEY);
  // axios.post('https://api.openai.com/v1/completions', {
  //     model: "text-davinci-002",
  //     // prompt: req.query.prompt,
  //     prompt: "Are you happy?",
  //     max_tokens: 256,
  //     // temperature: parseInt(req.query.sliderValue),
  //     temperature: 0.7
  //   }, {
  //     headers: {
  //       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  //     }
  //   }).then((response) => {
  //     // res.json(response.data.choices[0].text)
  //     res.send(response.data.choices[0].text)
  //   }).catch((err) => {
  //     console.log(err);
  //   })
})

// listen out to changes on our port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));