const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());

app.get('/getPDF', async (req, res) => {
  createHTMLFile(req.query.invoicePreview);
  const resPDF = await generatePDF();  
  DeleteFile(`${__dirname}/invoice.html`);
  res.set({ 'Content-Type': 'application/pdf', 'Content-Length': resPDF.length });
  res.send(resPDF);
});

function createHTMLFile(invoicePreview)
{
  const htmlDoc = `${htmlPrefix} ${invoicePreview} </body></html>`;    
  fs.appendFile('invoice.html', htmlDoc, function (err) {
    if (err) throw err;
  }); 
}

async function generatePDF() 
{ 
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(`file:${__dirname}/invoice.html`, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdf;
}

function DeleteFile(filepath)
{
  fs.unlink(filepath, (err) => {
    if (err) throw err;
  });
}

app.listen(4000, () => { console.log('listening on port 4000') });

//string constants
const htmlPrefix = '<html style="-webkit-print-color-adjust: exact;"><head><link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></head><body>';