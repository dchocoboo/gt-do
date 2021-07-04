'use strict';
const handler = require('./get.service');

module.exports.get = (event, context, callback) => {
    let id = event.pathParameters.id;

    if (typeof(id) === 'undefined') {
        callback(null, {
            statusCode: 400,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Missing id parameter',
        });
        return;
    }

    handler.get(id, function (err, item) {
        if (err) {
            console.error(err);
            callback(null, {
                statusCode: err.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t fetch the todo item.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(item),
        };
        callback(null, response);
    });
};