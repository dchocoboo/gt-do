const createHandler = require('../create');
const getHandler    = require('../get');

test('get created note', done => {
    let event = {
        body : JSON.stringify({
            "text":"get test"
        })
    }

    createHandler.create(event,null,createCallback);

    function createCallback(err, data){
        try {
            expect(data.statusCode).toBe(200);
        } catch (error) {
            done(error);
        }

        let payload = {
            pathParameters : {
                id : JSON.parse(data.body).id
            }
        }

        getHandler.get(payload, null, getCallback)
    }

    function getCallback(err, data){
        console.log('get data : ', data);

        try {
            expect(data.statusCode).toBe(200);
            done();
        } catch (error) {
            done(error);
        }
    }
});