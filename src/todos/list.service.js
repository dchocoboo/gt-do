'use strict';

const dynamodb = require('./dynamodb');

module.exports.list = (callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
    };

    // fetch all todos from the database
    dynamodb.scan(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(error, null);
            return;
        }

        callback(null, result.Items);
    });
}