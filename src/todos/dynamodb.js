'use strict';

const AWS = require('aws-sdk');

let options = {};
let isJest = process.env.JEST_WORKER_ID;

// connect to local DB if running offline

if (process.env.IS_OFFLINE || isJest) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    sslEnabled: false
  };
}


const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;
