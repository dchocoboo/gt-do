const dynamodb = require('./dynamodb');

module.exports.get = (id, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: id,
        },
    };

    // fetch todo from the database
    dynamodb.get(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(error, null);
            return;
        }

        callback(null, result.Item);
    });
}