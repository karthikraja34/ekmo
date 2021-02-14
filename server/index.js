const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const generatePDF = require('./puppeteer/pdf_generator');
const utils = require('./utils');
const fileUtil = new utils.fileUtil();

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json())

app.post('/downloadpdf', async (req, res) => {
  try {
    const filepath = fileUtil.createFile(req.body.htmlComponent, 'invoice.html');
    const resultPDF = await generatePDF(filepath);
    fileUtil.deleteFile(filepath);
    res.set({
      'Content-Type': 'application/pdf', 'Content-Length': resultPDF.length,
      'Content-Disposition': 'inline'
    });
    res.send(resultPDF);
  }
  catch (exception) {
    console.error(exception)
    res.status(500).send('Something broke!')
  }
});

app.listen(process.env.PORT, () => { console.log(`listening on port ${process.env.PORT}`)});
