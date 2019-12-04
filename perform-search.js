const lineReader = require('line-reader');
const fs = require('fs');

/**
 * 
 * searchFiles will scan the files (.json & .js files) from given Directory and return 
 * 
 * Can be configured for to search other formats like .java, .txt & .xml files
 * 
 * @param {*} filePath - File to scan for search string
 * @param {*} searchString - content To search 
 */
/* const searchFiles =  (filePath, searchString) => {
    return new Promise(function(resolve, reject) {
      lineReader.open(filePath, (err, reader) => {
        if (err) throw err;
        if (reader.hasNextLine()) {
          reader.nextLine((err, line) => {
            try {
              if (err) throw err;
              console.log(line);
              resolve(line.includes(searchString));
            } finally {
              reader.close( err => {
                if (err) throw err;          
              });
            }
          });
        }
        else {
          reader.close(function(err) {
            if (err) throw err;          
          });
        }
      });
    });
  } */

  const searchFiles =  (filePath, searchString) => {
    return new Promise( (resolve, reject) => {
      fs.readFile(filePath, function (err, data) {
        if (err) throw err;
        resolve(data.includes(searchString));
      });
    });
  }

  module.exports = searchFiles;