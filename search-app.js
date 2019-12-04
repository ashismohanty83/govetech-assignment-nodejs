const getAllFiles = require('./get-all-files');
const searchFiles = require('./perform-search');

const fileDirToSearch = './';
const searchString = 'TODO';

getAllFiles(fileDirToSearch).forEach(filename => {
    searchFiles(filename, searchString).then((isPresent) => {
        if (isPresent)
            console.log(filename);
    }); 
}); 
