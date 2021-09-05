import * as aws from "aws-sdk";
import * as dynamoDB from "@aws-sdk/client-dynamodb";

export interface Participant {
    lastName: string,
    firstName: string,
    username: string,
    titles: TitleData[],
    inProgressCertificates: Certificate[],
    completedCertificates: Certificate[],
    email: string,
}
  
export interface TitleData {
    name: string
    prerequisite: string[]
    id: string,
    order: number
}

interface Certificate {
    certificateName: string,
    id: string,
    level: string,
    order: number
}
  

export async function handler(event: any, context: any) {
    let client = new dynamoDB.DynamoDBClient({
        region: 'us-east-1'
    });

    console.log(event)
    if (event.httpMethod == "POST") {
        const body = event.body;
        const participant = JSON.parse(body).participant;
        let updatedParticipant: Participant = {
            firstName: participant._firstName,
            lastName: participant._lastName,
            email: participant._email,
            username: participant._username,
            completedCertificates: participant._completedCertificates,
            inProgressCertificates: participant._inProgressCertificates,
            titles: participant._titles
        }
        let whatever = await updateParticipant(client, updatedParticipant);
        
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: whatever
        }
    } else {
        console.log(`Query Params:\n${event.queryStringParameters}`)
        const tableName = event.queryStringParameters.tableName;
        console.log(tableName);    
    
        let participants = await getAllItems(client, tableName);
    
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(participants)
        }
    }
}

async function updateParticipant(client: dynamoDB.DynamoDBClient, updatedParticipant: Participant): Promise<Participant> {
    let dynamoConversion = aws.DynamoDB.Converter.marshall(updatedParticipant)
    console.log(`Updated Participant: ${JSON.stringify(dynamoConversion)}`)
    
    const putCommand = new dynamoDB.PutItemCommand({
        Item: JSON.parse(JSON.stringify(dynamoConversion)),
        TableName: 'aws-glory-participants'
    })

    try {
        const results: dynamoDB.PutItemCommandOutput = await client.send(putCommand);
        console.log(results)
        return updatedParticipant;
    } catch (err) {
        console.log(err);
        
    }
}

async function getAllItems(client: dynamoDB.DynamoDBClient, tableName: string): Promise<Participant[]> {
    const items: Participant[] = []

    const scanCommand = new dynamoDB.ScanCommand({
        TableName: tableName
    })

    try {
        const results: dynamoDB.ScanCommandOutput = await client.send(scanCommand);
        results.Items?.forEach(item => {
            items.push(<Participant><unknown>aws.DynamoDB.Converter.unmarshall(item))
        })
        return items;
    } catch (err) {
        console.log(err);
        return items;
    }
    return items;
}
