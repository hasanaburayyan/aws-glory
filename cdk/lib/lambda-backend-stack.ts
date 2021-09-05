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

        let certificateServiceLambda: lambda.Function = new lambda.Function(this, 'aws-glory-certificate-service', {
            code: lambda.Code.fromAsset(
                path.join(__dirname, './custom_resources/certificate-services'),
                {
                    exclude: ["*.ts", "test.js"]
                }
            ),
            handler: "certificate-service.handler",
            runtime: lambda.Runtime.NODEJS_14_X,
            memorySize: 128
        })


        // REST API:
        let restApi = new apigateway.RestApi(this, 'aws-glory-api-rest', {
            restApiName: "aws-glory-api",
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS
            }
        });
        
        // Models
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
            }
        );

        const participantResponseModel: apigateway.Model = restApi.addModel(
            'aws-glory-participant-mod',
            {
                contentType: 'application/json',
                schema: {
                    type: apigateway.JsonSchemaType.OBJECT
                }
            }
        );

        const certificateResponseModel: apigateway.Model = restApi.addModel(
            'aws-glory-certificate-mod',
            {
                contentType: 'application/json',
                schema: {
                    type: apigateway.JsonSchemaType.OBJECT,
                    properties: {
                        certificateId: {
                            type: apigateway.JsonSchemaType.STRING
                        }
                    },
                    required: ['certificateId']
                }
            }
        );

        // Resources
        let dynamoResource = restApi.root.addResource('dynamodb');

        dynamoResource.addMethod('GET',
            new apigateway.LambdaIntegration(participantServiceLambda),
            {
                requestModels: {
                    'application/json': dynamodbResponseModel
                }
            }
        );

        dynamoResource.addMethod('POST',
            new apigateway.LambdaIntegration(participantServiceLambda),
            {
                requestModels: {
                    'application/json':  participantResponseModel
                }
            }
        );

        let certificateResource = dynamoResource.addResource('certificate');

        certificateResource.addMethod('GET',
            new apigateway.LambdaIntegration(certificateServiceLambda),
            {
                requestModels: {
                    'application/json': certificateResponseModel
                }
            }
        )

        let serviceResource = restApi.root.addResource('dynamodbService')

        serviceResource.addMethod('GET', new apigateway.LambdaIntegration(participantServiceLambda))

        // dynamoResource.addCorsPreflight({
        //     allowMethods: apigateway.Cors.ALL_METHODS,
        //     allowOrigins: apigateway.Cors.ALL_ORIGINS
        // })

        dynamoStack.dbTables.forEach(table => {
            table.grantFullAccess(participantServiceLambda);
            table.grantFullAccess(certificateServiceLambda);
        })
    }
}
