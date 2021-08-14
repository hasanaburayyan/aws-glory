import * as cdk from "@aws-cdk/core";
import * as dynamodb from '@aws-cdk/aws-dynamodb';

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

    }
}
