'use strict';
const handler = require('./delete.service');

module.exports.delete = (event, context, callback) => {
    let id = event.pathParameters.id;

    if (typeof (id) === 'undefined') {
        callback(null, {
            statusCode: 400,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Missing id parameter',
        });
        return;
    }

    handler.delete(id, function (err) {
        if (err) {
            console.error(err);
            callback(null, {
                statusCode: err.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t delete the todo item.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200
        };
        callback(null, response);
    });
}