import { unstable_noStore as noStore } from 'next/cache';

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import
import { fromEnv } from '@aws-sdk/credential-provider-env'

const client = new S3Client({region: 'us-east-1', credentials: fromEnv()})

interface S3Object {
    Bucket: string,
    Key: string
}

interface WeatherData {
    type: 'weather',
    current_time: string,
    current_temp: number,
    day_or_night: boolean,
    cloudcover_percentage: number,
    sky_color: string,
}

interface SpotifyData {
    type: 'spotify',
    access_token: string,
    refresh_token: string,
}

type S3Data =  WeatherData | SpotifyData

// add interface for data returned by getS3Data

export const getS3Data = async (input: S3Object): Promise<S3Data | null> => {
    try {
    noStore();
    const command = new GetObjectCommand(input);
    const { Body } = await client.send(command);
    const data:any = await Body?.transformToString()
    const jsonData = JSON.parse(data)
    
    if('current_temp' in jsonData) {
        return {type: 'weather', ...jsonData};
    } else if ('access_token' in jsonData) {
        return {type: 'spotify',...jsonData}
    } else {
        console.error('Unknown data type in S3Data');
        return null
    }
    } catch (error) {
        console.error('Error fetching data from S3:', error);
        throw error;
    }
    
}