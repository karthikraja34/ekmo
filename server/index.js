const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const generatePDF = require('./puppeteer/pdf_generator');
const utils = require('./utils');
const fileUtil = new utils.fileUtil();

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
  catch (e) {
    console.log(e)
    res.status(500).send('Something broke!')
  }
});

app.listen(4000, () => { console.log('listening on port 4000') });
