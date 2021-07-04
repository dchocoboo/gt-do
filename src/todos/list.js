'use strict';
const handler = require('./list.service');

module.exports.list = (event, context, callback) => {
    handler.list(function (err, items) {
        if (err) {
            console.error(err);
            callback(null, {
                statusCode: err.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t fetch the todo items.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(items),
        };
        callback(null, response);
    });
};