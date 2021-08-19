import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as path from "path";
import {DynamodbStack} from "./dynamodb-stack";
import { rootPathTo } from "@aws-cdk/core";

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
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS
            }
        });

        const dynamodbResponseModel: apigateway.Model = restApi.addModel(
            'aws-glory-DynamoDB-mod',
            {
                contentType: 'application/json',
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

        let dynamoResource = restApi.root.addResource('dynamodb');

        dynamoResource.addMethod('GET',
            new apigateway.LambdaIntegration(participantServiceLambda),
            {
                requestModels: {
                    'application/json': dynamodbResponseModel
                }
            }
        );

        let serviceResource = restApi.root.addResource('dynamodbService')

        serviceResource.addMethod('GET', new apigateway.LambdaIntegration(participantServiceLambda))

        // dynamoResource.addCorsPreflight({
        //     allowMethods: apigateway.Cors.ALL_METHODS,
        //     allowOrigins: apigateway.Cors.ALL_ORIGINS
        // })

        dynamoStack.dbTables.forEach(table => {
            table.grantFullAccess(participantServiceLambda);
        })
    }
}
