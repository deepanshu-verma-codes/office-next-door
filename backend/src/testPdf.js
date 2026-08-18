const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('/Users/deepanshuverma/Downloads/IT_Companies_India_32_Cities_Directory.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text.substring(0, 2000));
});
