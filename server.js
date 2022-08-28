const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

require('dotenv').config();
const PORT = process.env.PORT || 8000;
const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10
});
app.use(limiter);
app.set('trust proxy', 1);

app.use(cors());

if (process.env.NODE_ENV=== "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.get('/plot', (req, res) => {
  axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-002",
      prompt: req.query.prompt,
      max_tokens: 256,
      temperature: parseInt(req.query.sliderValue),
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }).then((response) => {
      res.json(response.data.choices[0].text)
    }).catch((err) => {
      console.log(err);
    })
})


// listen out to changes on our port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));