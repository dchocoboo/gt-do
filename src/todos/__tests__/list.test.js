const createHandler = require('../create');
const listHandler    = require('../list');

test('list notes', done => {
    let event = {
        body : JSON.stringify({
            "text":"list test"
        })
    }

    createHandler.create(event,null,createCallback);

    function createCallback(err, data){
        try {
            expect(data.statusCode).toBe(200);
        } catch (error) {
            done(error);
        }

        listHandler.list(null, null, listCallback)
    }

    function listCallback(err, data){
        try {
            console.log('list data : ',data);

            expect(JSON.parse(data.body).length).toBeGreaterThanOrEqual(1);
            done();
        } catch (error) {
            done(error);
        }
    }
});