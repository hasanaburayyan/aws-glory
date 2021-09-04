import * as cdk from "@aws-cdk/core";
import {EcrStack} from "../ecr-stack";
import {S3Stack} from "../s3-stack";
import {CodeCommitStack} from "../code-commit-stack";
import {DynamodbStack} from "../dynamodb-stack";
import {CognitoStack} from "../cognito-stack";
import {LambdaBackendStack} from "../lambda-backend-stack";

export class AwsGloryService extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        let myAccount = {account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-1'}

        let codecommit = new CodeCommitStack(this, 'aws-glory-codecommit-stack', {env: myAccount, stackName: 'aws-glory-codecommit'})

        let ecrStack = new EcrStack(this, 'aws-glory-ecr-stack', {env: myAccount, stackName: 'aws-glory-ecr'})

        let s3Stack = new S3Stack(this, 'aws-glory-s3-stack', {env: myAccount, stackName: 'aws-glory-s3'})

        let dynamoStack = new DynamodbStack(this, 'aws-glory-dynamodb-pop-stack', {env: myAccount, stackName: 'aws-glory-dynamodb-pop'})

        let cognitoStack = new CognitoStack(this, 'aws-glory-cognito-stack', {env: myAccount, stackName: 'aws-glory-cognito'})

        let lambdaBackend = new LambdaBackendStack(this, 'aws-glory-lambda-backend-stack', dynamoStack,  {env: myAccount, stackName: 'aws-glory-lambda-backend'})

    }
}
