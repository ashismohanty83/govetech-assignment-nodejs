const lineReader = require('line-reader');
const fs = require('fs');
const path = require('path');
const walk = require('walk');

const fileDirToSearch = 'C:\\Project\\new-dir\\';
const searchString = 'TODO';

function filewalker(dir, done) {

  let results = [];

  fs.readdir(dir, function(err, list) {
      if (err) return done(err);

      var pending = list.length;

      if (!pending) 
        return done(null, results);

      list.forEach(function(file) {
          file = path.resolve(dir, file);

          fs.stat(file, function(err, stat) {
              if (stat && stat.isDirectory()) {
                  filewalker(file, (err, res) => {
                      results = results.concat(res);
                      if (!--pending) 
                        done(null, results);
                  });
              } else {
                  if (file.endsWith('.txt') || file.endsWith('.js')) {
                    results.push(file);
                    /* isSerchStringPresent(file).then((isPresent) => {
                      if (isSerchStringPresent(file)) {
                          console.log("Results length: " + results.length);
                          results.push(file);
                          console.log('is file present' + file + ': '+ isPresent);
                      }  
                    }); */
                  }
                  if (!--pending) 
                    done(null, results);
              }
          });
      });
  });
};

filewalker(fileDirToSearch, function(err, data) {
  if(err){
      throw err;
  }
  data.forEach(filePath => {
    isSerchStringPresent(filePath).then((isPresent) => {
      if (isPresent)
          console.log(filePath);
    });
  });
});

function isSerchStringPresent(filePath) {
  //console.log('execution started isSerchStringPresent' + filePath);
  return new Promise(function(resolve, reject) {
    lineReader.open(filePath, (err, reader) => {
      if (err) throw err;
      if (reader.hasNextLine()) {
        reader.nextLine((err, line) => {
          try {
            if (err) throw err;
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
}