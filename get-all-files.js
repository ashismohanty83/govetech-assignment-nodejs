const fs = require('fs');
const path = require('path');

/**
 * 
 * getFileList will get the files from given Directory and return only .json & .js files
 * 
 * Can be configured for to search other formats like .java, .txt & .xml files
 * 
 * @param {*} dir - Root directory to scan for search string
 * @param {*} filelist - bind the result
 */
  const getAllFiles = (dir, filelist) => {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(file => {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = getAllFiles(dir + file + '/', filelist);
      } else {
        if (file.endsWith('.json') || file.endsWith('.js'))
          filelist.push(dir + file);
      }
    });
    return filelist;
  };

  module.exports = getAllFiles;