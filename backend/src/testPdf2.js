const fs = require('fs');
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync('./rawPdf.txt', pdfParser.getRawTextContent());
    console.log(fs.readFileSync('./rawPdf.txt', 'utf8').substring(600, 2000));
});

pdfParser.loadPDF("/Users/deepanshuverma/Downloads/IT_Companies_India_32_Cities_Directory.pdf");
