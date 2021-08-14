import * as cdk from "@aws-cdk/core";
import * as cognito from '@aws-cdk/aws-cognito';
import {AccountRecovery} from '@aws-cdk/aws-cognito';

export class CognitoStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        let pool = new cognito.UserPool(this, 'aws-glory-user-pool', {
            userPoolName: "aws-glory-participants",
            selfSignUpEnabled: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            passwordPolicy: {
                minLength: 8,
                requireLowercase: false,
                requireUppercase: false,
                requireDigits: false,
                requireSymbols: false
            },
            accountRecovery: AccountRecovery.EMAIL_ONLY
        });

        let poolClient = pool.addClient('user-pool-client', {
            userPoolClientName: 'aws-glory-client',
            idTokenValidity: cdk.Duration.days(1),
        })

        new cdk.CfnOutput(this, 'aws-glory-cog-user-pool', {
            value: pool.userPoolId
        })

        new cdk.CfnOutput(this, 'aws-glory-cog-user-app-client', {
            value: poolClient.userPoolClientId
        })
    }
}
