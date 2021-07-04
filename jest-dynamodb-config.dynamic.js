// trigger serverless to get full DDB tables
// this code doesn't work (just for reference)
// tried few attempts to solve it but couldn't work.
// serverless init triggers aws-sdk param validator that checks serverless/dynamo.yml values
// the problem is that the SSESpecification parameters differ between Cloudformation and Dynamodb
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-table-ssespecification.html
// https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_SSESpecification.html
// so when you put SSEEnabled (Cloudformation compliant) on the serverless yml, it will successfully deploy
// but if you put Enabled (DynamoDB compliant) instead, it will pass local test but fail to deploy

module.exports = async () => {
    const serverless = new (require('serverless'))();

    await serverless.init();
    const service = await serverless.variables.populateService();

    const resources = service.resources.filter(r => Object.keys(r).includes('Resources'));

    var tables = [];

    resources.forEach(r => {
        let resourceDetail = (Object.keys(r.Resources).map(name => r.Resources[name])[0]);
        
        if (resourceDetail.Type === 'AWS::DynamoDB::Table') {
            tables.push(resourceDetail.Properties);
        }
    });

    process.env.DYNAMODB_TABLE = service.provider.environment.DYNAMODB_TABLE;
    
    return {
        tables,
        port: 8000
    };
};