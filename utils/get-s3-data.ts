import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import
import { fromEnv } from '@aws-sdk/credential-provider-env'
import { cache } from 'react';

const client = new S3Client({region: 'us-east-1', credentials: fromEnv()})

interface S3Object {
    Bucket: string,
    Key: string
}

export const revalidate = 900;

export const getS3Data = cache(async (input: S3Object) => {
    const command = new GetObjectCommand(input);
    const { Body } = await client.send(command);
    const data:any = await Body?.transformToString()
    const jsonData = JSON.parse(data)
    return jsonData;
})