import * as cdk from "@aws-cdk/core";
import * as codecommit from "@aws-cdk/aws-codecommit";

export class CodeCommitStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        let repo = new codecommit.Repository(this, 'aws-glory', {
            repositoryName: "aws-glory-mirrored-from-github"
        })
    }
}
