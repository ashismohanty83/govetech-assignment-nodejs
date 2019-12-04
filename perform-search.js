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
  const searchFiles =  (filePath, searchString) => {
    return new Promise( (resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        resolve(data.includes(searchString));
      });
    });
  }

  module.exports = searchFiles;