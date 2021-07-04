const uuid = require('uuid');
const dynamodb = require('./dynamodb');

module.exports.create = (text, callback) => {
    const timestamp = new Date().getTime();

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            text: text,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    // write the todo to the database
    dynamodb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(error, null);
            return;
        }

        callback(null, params.Item);
    });
}