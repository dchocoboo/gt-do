'use strict';

const dynamodb = require('./dynamodb');

module.exports.update = (id, data, callback) => {
    const timestamp = new Date().getTime();

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: id,
        },
        ExpressionAttributeNames: {
            '#todo_text': 'text',
        },
        ExpressionAttributeValues: {
            ':text': data.text,
            ':checked': data.checked,
            ':updatedAt': timestamp,
        },
        UpdateExpression: 'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
    };

    // update the todo in the database
    dynamodb.update(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(error, null);
            return;
        }

        callback(null, result);
    });
}