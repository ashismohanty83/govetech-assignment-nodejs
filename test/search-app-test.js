const assert = require('chai').assert;
const mocha = require('mocha');
const getAllFiles = require('../get-all-files');
const searchFiles = require('../perform-search');

describe('check search operation only for  files', () => {
    it('get all files in the directory and check', () => {
        
        let isJsAndJsonFileExist;

        getAllFiles('./test/').forEach(fileName => {
            if (fileName.endsWith('.json') || fileName.endsWith('.js'))
                isJsAndJsonFileExist = true;
            else {
                isJsAndJsonFileExist = false;
            }
        });

       assert.isTrue(isJsAndJsonFileExist);
    });
  });

  describe('check if files folder1/folder2/todo.js contains "TODO"', () => {
    it('get all files in the directory and check', () => {
        searchFiles('./test/folder1/folder2/todo.js', "TODO").then((isPresent) => {
            assert.isTrue(isPresent);   
        });
    });
  });

  describe('check if file "todo-test.js" does not contain "TODO"', () => {
    it('call perform-search to scan the file', async () => {
        searchFiles('./test/folder1/todo-test.js', "TODO").then((isPresent) => {
            assert.isFalse(isPresent);
        });
    });
  });

   describe('check if file "./test/folder1/folder2/test.json" contains "TODO"', () => {
    it('call perform-search to scan the file', () => {
        searchFiles('./test/folder1/folder2/test.json', "TODO").then((isPresent) => {
            assert.isTrue(isPresent);
        });
    });
  }); 