const handler = require('../create');

test('create note', done => {
    let event = {
        body : JSON.stringify({
            "text":"created test"
        })
    }

    function callback(err, data){
        console.log('created data : ', data);

        try {
            expect(data.statusCode).toBe(200);
            done();
        } catch (error) {
            done(error);
        }
    }

    handler.create(event,null,callback);
});