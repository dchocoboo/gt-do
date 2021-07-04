// gets the default serverless config, parse it and remove the data
const path = require('path');
const yaml = require('yaml-boost');
const vsprintf = require('sprintf-js').vsprintf;

module.exports = (async () => {
    let sls = yaml.load(path.join(__dirname, 'serverless.yml'));

    let ddbTable = vsprintf('%s-%s',[sls.service, process.env.NODE_ENV]);

    // get the dynamodb tables
    let tables = getTables(sls, ddbTable);

    process.env.DYNAMODB_TABLE = ddbTable;

    return {
        tables,
        port: 8000
    };
});

function getTables(service, ddbTable){
    const resources = service.resources.filter(r => Object.keys(r).includes('Resources'));

    var tables = [];

    resources.forEach(r => {
        let resourceDetail = (Object.keys(r.Resources).map(name => r.Resources[name])[0]);
        
        if (resourceDetail.Type === 'AWS::DynamoDB::Table') {
            resourceDetail.Properties.TableName = ddbTable;
            delete(resourceDetail.Properties.SSESpecification.SSEEnabled);
            tables.push(resourceDetail.Properties);
        }
    });

    return tables;
}