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
            userVerification: {
              emailStyle: cognito.VerificationEmailStyle.LINK,
                emailSubject: "Complete AWS-GLORY Registration!",
                emailBody: "Please Complete The Following Registration...\n {{##Verify Email##}}"
            },
            passwordPolicy: {
                minLength: 8,
                requireLowercase: false,
                requireUppercase: false,
                requireDigits: false,
                requireSymbols: false
            },
            accountRecovery: AccountRecovery.EMAIL_ONLY,
            autoVerify: {
                email: true
            },
            signInCaseSensitive: false
        });

        pool.addDomain('aws-glory-domain', {
            cognitoDomain: {
                domainPrefix: 'glory'
            }
        })

        let poolClient = pool.addClient('user-pool-client', {
            userPoolClientName: 'aws-glory-client',
            idTokenValidity: cdk.Duration.days(1),
            readAttributes: new cognito.ClientAttributes().withStandardAttributes({
                email: true,
                givenName: true,
                familyName: true,
                fullname: true,
                emailVerified: true
            })
        })



        new cdk.CfnOutput(this, 'aws-glory-cog-user-pool', {
            value: pool.userPoolId
        })

        new cdk.CfnOutput(this, 'aws-glory-cog-user-app-client', {
            value: poolClient.userPoolClientId
        })
    }
}
