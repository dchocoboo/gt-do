'use strict';

const dynamodb = require('./dynamodb');

module.exports.delete = (id, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: id,
        },
    };

    // update the todo in the database
    dynamodb.delete(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(error, null);
            return;
        }

        callback(null, {});
    });
};