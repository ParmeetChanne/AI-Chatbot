require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const router = express.Router();
const port = process.env.PORT || 4000;

const configuration = new Configuration({
  apiKey: "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"
});

app.use(cors());
app.use(bodyParser.json());
app.use(router);

router.post('/message', async (req, res) => {
    const { message } = req.body;
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: 'text-ada-001',
      prompt: message,
      max_tokens: 100,
      temperature: 0
    });
  
    res.status(200).json({
      message: response.data.choices[0].text
    });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});