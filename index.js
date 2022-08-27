//file starts here
const htmlPdf = require("html-pdf");
const fs = require("fs");

/**
@description This method is used to Covert HTML to PDF.
* @param {String} typeOfFile Type of File You want to generate
*
@param (String} filePath Path of html content file
* @param {String} fileName File Name of html content file
* @param {String} toBeGenFileName File Name of to be generated file
*/

function GeneratePdf(typeOfFile, filePath, fileName, toBeGenFileName) {
  try {
    let HTMLFilePath = `.${filePath}${fileName}`;
    
    //checking file Exsistancy
    if (!fs.existsSync(HTMLFilePath)) {
      console.log("File Doesn't Exsists.");
    }
    // by default we are using .pdf extension
    typeOfFile === "PNG"
      ? (toBeGenFileName += ".png")
      : (toBeGenFileName += ".pdf");
    const htmlContent = fs.readFileSync(HTMLFilePath, "utf8");
    const htmlToPdfOptions = {
      type: typeOfFile, // allowed file types: png, jpeg, pdf
      height: "650px", // allowed units: mm, cm, in, px
      width: "850px", // allowed units: mm, cm, in, px
      renderDelay: 2000,
    };
    config = {
     // Override the initial pagination number
      "header": {
        "height": "45mm",
        "contents": '<div style="text-align: center;">Author: Marc Bachmann</div>'
      },
      "footer": {
        "height": "28mm",
        "contents": {
          first: 'Cover page',
          2: 'Second page', // Any page number is working. 1-based index
          default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: 'Last Page'
        }
      }    
    }

    htmlPdf
      .create(htmlContent, htmlToPdfOptions)
      .toFile(toBeGenFileName, function (err, result) {
        if (err) return console.log(err);
        console.log(result);
      });
  } catch (error) {
    console.log("error while converting html-to-PDF", error);
  }
}
GeneratePdf("PDF", "/", "test.html", "cert_sample");
//file ends here
