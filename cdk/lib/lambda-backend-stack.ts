import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as path from "path";
import {DynamodbStack} from "./dynamodb-stack";

export class LambdaBackendStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, dynamoStack: DynamodbStack, props?: cdk.StackProps) {
        super(scope, id, props);

        // LAMBDAS:
        let participantServiceLambda: lambda.Function = new lambda.Function(this, 'aws-glory-participant-service', {
            code: lambda.Code.fromAsset(
                path.join(__dirname, './custom_resources/participants-services'),
                {
                    exclude: ["*.ts", "test.js"]
                }
            ),
            handler: "participant-service.handler",
            runtime: lambda.Runtime.NODEJS_14_X,
            memorySize: 128
        });


        // REST API:
        let restApi = new apigateway.RestApi(this, 'aws-glory-api-rest', {
            restApiName: "aws-glory-api",
        });

        const dynamoDbService: apigateway.Model = restApi.addModel(
            'aws-glory-DynamoDBModel',
            {
                schema: {
                    type: apigateway.JsonSchemaType.OBJECT,
                    properties: {
                        tableName: {
                            type: apigateway.JsonSchemaType.STRING
                        }
                    },
                    required: ['tableName']
                }
            });

        restApi.root.addResource('dynamodb').addMethod('GET',
            new apigateway.LambdaIntegration(participantServiceLambda),
            {
                requestModels: {
                    'application/json': dynamoDbService
                }
            }
        );

        let res = new apigateway.Resource(this, 'aws-glory-api-dynamo', {
            defaultMethodOptions: {
                operationName: "ListTableContent",
            },
            parent: restApi.root,
            pathPart: "dynamodbService"
        })

        new apigateway.Method(this, 'aws-glory-test-method',{httpMethod: "GET", resource: res})

        dynamoStack.dbTables.forEach(table => {
            table.grantFullAccess(participantServiceLambda);
        })
    }
}
