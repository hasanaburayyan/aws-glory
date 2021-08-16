import * as aws from "aws-sdk";
import * as dynamoDB from "@aws-sdk/client-dynamodb";

interface Particpant {
    lastName: string,
    firstName: string,
    titles: string[],
    id: string,
    inProgressCertificates: string[],
    completedCertificates: string[],
    sumo: string,
    email?: string,
}

export async function handler(event: any, context: any) {
    console.log(event)
    console.log(`Query Params:\n${event.queryStringParameters}`)
    const tableName = event.queryStringParameters.tableName;
    console.log(tableName);
    let client = new dynamoDB.DynamoDBClient({
        region: 'us-east-1'
    });


    let participants = await getAllItems(client, tableName);

    return {
        statusCode: 200,
        headers: {

        },
        body: JSON.stringify(participants)
    }
}

async function getAllItems(client: dynamoDB.DynamoDBClient, tableName: string): Promise<Particpant[]> {
    const items: Particpant[] = []

    const scanCommand = new dynamoDB.ScanCommand({
        TableName: tableName
    })

    try {
        const results: dynamoDB.ScanCommandOutput = await client.send(scanCommand);
        results.Items?.forEach(item => {
            items.push(<Particpant><unknown>aws.DynamoDB.Converter.unmarshall(item))
        })
        return items;
    } catch (err) {
        console.log(err);
        return items;
    }
    return items;
}
