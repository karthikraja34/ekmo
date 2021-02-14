const puppeteer = require('puppeteer');

module.exports = async function generatePDF(htmlfilepath) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(`file:${htmlfilepath}`, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4'});
  await browser.close();
  return pdf;
}