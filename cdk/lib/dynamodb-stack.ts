import * as cdk from "@aws-cdk/core";
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from "path";

export class DynamodbStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        let tables = ["certificates", "participants", "milestones"]

        let dbTables: dynamodb.Table[] = [];

        tables.forEach(table => {
            dbTables.push(new dynamodb.Table(this, "aws-glory-".concat(table), {
                tableName: "aws-glory-".concat(table),
                partitionKey: {
                    name: 'id',
                    type: dynamodb.AttributeType.STRING
                },
                readCapacity: 5,
                removalPolicy: cdk.RemovalPolicy.DESTROY,
                writeCapacity: 5
            }));
        })

        let populateLambda = new lambda.Function(this, 'aws-glory-lambda-populate-db', {
            code: lambda.Code.fromAsset(
                path.join(__dirname, './custom_resources/populate-dynamodb-table')
            ),
            handler: "populate-dynamodb-tables.handler",
            runtime: lambda.Runtime.NODEJS_14_X,
            memorySize: 128,
        });

        let customResource = new cdk.CustomResource(this, 'populate-databases', {
            serviceToken: populateLambda.functionArn,
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });


        dbTables.forEach(table => {
            table.grantFullAccess(populateLambda);
            customResource.node.addDependency(table)
        })
    }
}
