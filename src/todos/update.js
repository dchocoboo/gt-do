'use strict';
const handler = require('./update.service');

module.exports.update = (event, context, callback) => {
    const data = JSON.parse(event.body);

    // validation
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

    if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Body parameters invalid',
        });
        return;
    }

    handler.update(id, data, function (err, result) {
        if (err) {
            console.error(err);
            callback(null, {
                statusCode: err.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: 'Couldn\'t update the todo item.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
        callback(null, response);
    });
};