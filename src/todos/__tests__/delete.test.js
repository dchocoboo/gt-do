const createHandler = require('../create');
const deleteHandler = require('../delete');

test('delet created note', done => {
    let event = {
        body : JSON.stringify({
            "text":"delete note"
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

        deleteHandler.delete(payload, null, deleteCallback)
    }

    function deleteCallback(err, data){
        try {
            console.log('delete data :', data);

            expect(data.statusCode).toBe(200);
            done();
        } catch (error) {
            done(error);
        }
    }
});