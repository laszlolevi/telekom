require('dotenv').config();
const fs = require('fs');
const path = require('path')
const uuid = require('uuid');

const APPLICATION_NAME = process.env.APPLICATION_NAME;
const TEST_FILE_PATH = path.join(__dirname, '..', 'assets', 'testfile.txt');

exports.getQuery = function getQuery(filter, rowsParameter, pageParamter) {
    return new Promise((resolve, reject) => {
        let rows = parseInt(rowsParameter, 10);
        let page = parseInt(pageParamter, 10);
        if (isNaN(rows) || isNaN(page)) {
            console.error('Validating error:', { rows, page });
            reject({ rows, page });
        } else {
            resolve({ applicationName: APPLICATION_NAME, filter: filter, rows: rows, page: page });
        }
    });
}

exports.getKey = function getKey(key) {
    return new Promise(resolve => {
        resolve({ applicationName: APPLICATION_NAME, key: key })
    });
}

exports.getFirstLine = function readFirstLine() {
    return new Promise((resolve, reject) => {
        //the file's size can be big, it will only read the first line 
        let readStream = fs.createReadStream(TEST_FILE_PATH, { encoding: 'utf8' });
        let result = '';
        let position = 0;
        let index;
        readStream
            .on('data', function (chunk) {
                index = chunk.indexOf('\n');
                result += chunk;
                index !== -1 ? readStream.close() : position += chunk.length;
            })
            .on('close', function () {
                resolve(result.slice(0, position + index));
            })
            .on('error', function (error) {
                console.error('Cannot read firts line', error);
                reject(error);
            })
    });
}

exports.putBody = function putBody(key, body) {
    return new Promise(resolve => {
        resolve(Object.assign({}, body, { applicationName: APPLICATION_NAME, key: key }));
    });
}

exports.postBody = function postBody(body) {
    return new Promise(resolve => {
        resolve(Object.assign({}, body, { applicationName: APPLICATION_NAME, key: uuid.v1() }));
    });
}


