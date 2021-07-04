const createHandler = require('../create');
const updateHandler = require('../update');

test('delet created note', done => {
    let event = {
        body : JSON.stringify({
            "text":"update note"
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
            },
            body : JSON.stringify({
                text: "update note (2)",
                checked : true
            })
        }

        updateHandler.update(payload, null, updateCallback)
    }

    function updateCallback(err, data){
        try {
            console.log('update data :', data);

            expect(data.statusCode).toBe(200);
            done();
        } catch (error) {
            done(error);
        }
    }
});