import * as cdk from '@aws-cdk/core';
import * as ecr from "@aws-cdk/aws-ecr";

export class EcrStack extends cdk.Stack {
  public awsGloryECR: ecr.Repository;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    this.awsGloryECR = new ecr.Repository(this, 'aws-ecr-repo', {
      repositoryName: "my-angular-env",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      imageTagMutability: ecr.TagMutability.MUTABLE
    });

    new cdk.CfnOutput(this, 'ecr-output', {
      exportName: "ECR:REPOSITORY:URL",
      value: this.awsGloryECR.repositoryUri
    })
  }
}
