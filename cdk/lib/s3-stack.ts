import * as cdk from "@aws-cdk/core";
import {RemovalPolicy} from "@aws-cdk/core";
import * as s3 from '@aws-cdk/aws-s3';

export class S3Stack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // Your Code below here!

        let corsRule: s3.CorsRule = {
            allowedHeaders: ["*"],
            allowedMethods: [s3.HttpMethods.DELETE, s3.HttpMethods.GET, s3.HttpMethods.PUT, s3.HttpMethods.POST],
            allowedOrigins: ["*"]
        }

        let bucket = new s3.Bucket(this, 'aws-glory-bucket', {
            bucketName: 'aws-glory',
            removalPolicy: RemovalPolicy.RETAIN,
            websiteIndexDocument: 'index.html',
            publicReadAccess: true,
            cors: [corsRule],
        })
    }
}
