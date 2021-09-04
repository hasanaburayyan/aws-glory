import * as aws from "aws-sdk";
import * as dynamoDB from "@aws-sdk/client-dynamodb";

interface Certificate {
    name: string,
    level: string
}

export async function handler(event: any, context: any) {
    console.log(event)
    console.log(`Query Params:\n${event.queryStringParameters}`)
    const certificateId = event.queryStringParameters.certificateId;
    console.log(certificateId);
    let client = new dynamoDB.DynamoDBClient({
        region: 'us-east-1'
    });


    let participants = await getAllItems(client, certificateId);

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(participants)
    }
}

async function getAllItems(client: dynamoDB.DynamoDBClient, certificateId: string): Promise<Certificate> {

    const queryCommand = new dynamoDB.QueryCommand({
        TableName: 'aws-glory-certificates',
        KeyConditions: {
            "id": {
                ComparisonOperator: "EQ",
                AttributeValueList: [
                    {
                        "S": certificateId
                    }
                ]
            }
        }
    })

    let cert: Certificate = {name: 'no-cert-found', level: 'check-database'};

    try {
        const results: dynamoDB.QueryCommandOutput = await client.send(queryCommand);
        results.Items?.forEach(item => {
            cert = <Certificate><unknown>aws.DynamoDB.Converter.unmarshall(item);
        });
        return cert;
    } catch (err) {
        console.log(err);
        return cert;
    }
    return cert;
}
