import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
const PORT = 8000;

dotenv.config();

// use express to listen out to our server
const app = express();

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
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      }).then((response) => {
        res.json(response.data.choices[0].text)
      }).catch((err) => {
        console.log(err);
      })
})

// listen out to changes on our port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))