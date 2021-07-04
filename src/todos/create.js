'use strict';
const handler = require('./create.service');

module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);
    if (typeof data.text !== 'string') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: {
                'Content-Type': 'text/plain',
            },
            body: 'Couldn\'t create the todo item.',
        });
        return;
    }

    handler.create(data.text, function(err, item){
        if (err) {
            console.error(err);
            callback(null, {
                statusCode: err.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: 'Couldn\'t create the todo item.',
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
