import * as cdk from "@aws-cdk/core";
import * as dynamodb from '@aws-cdk/aws-dynamodb';

interface tableConfig {
    name: string,
    partitionKey: string
}

export class DynamodbStack extends cdk.Stack {
    public dbTables: dynamodb.Table[];
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        let tables: tableConfig[] = [
            {
                name: "certificates",
                partitionKey: "id"
            },
            {
                name: "participants",
                partitionKey: "email"
            },
            {
                name: "milestones",
                partitionKey: "id"
            }]

        this.dbTables =  [];

        tables.forEach(table => {
            this.dbTables.push(new dynamodb.Table(this, "aws-glory-".concat(table.name), {
                tableName: "aws-glory-".concat(table.name),
                partitionKey: {
                    name: table.partitionKey,
                    type: dynamodb.AttributeType.STRING
                },
                readCapacity: 5,
                removalPolicy: cdk.RemovalPolicy.DESTROY,
                writeCapacity: 5
            }));
        })

    }
}
