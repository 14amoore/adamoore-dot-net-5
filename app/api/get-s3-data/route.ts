// app/api/get-s3-data/route.ts
import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-provider-env';
import { Readable } from 'stream';
import { WEATHER_DATA_INPUT } from '@/utils/constants'; // Adjust this import path as necessary

const client = new S3Client({ region: 'us-east-1', credentials: fromEnv() });

// Helper function to convert S3 stream to string
const streamToString = async (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    let data = '';
    stream.on('data', (chunk) => (data += chunk));
    stream.on('end', () => resolve(data));
    stream.on('error', (err) => reject(err));
  });
};

export async function GET() {
  try {
    const command = new GetObjectCommand(WEATHER_DATA_INPUT);
    const { Body } = await client.send(command);

    if (Body instanceof Readable) {
      const data = await streamToString(Body);
      const jsonData = JSON.parse(data);

      // Set headers to prevent caching
      const headers = new Headers({
        'Cache-Control': 'no-store, max-age=0',
      });

      // Return data with type detection for structured data
      if ('current_temp' in jsonData) {
        return NextResponse.json({ type: 'weather', ...jsonData }, { headers });
      } else if ('access_token' in jsonData) {
        return NextResponse.json({ type: 'spotify', ...jsonData }, { headers });
      } else {
        console.error('Unknown data type in S3Data');
        return NextResponse.json({ error: 'Unknown data type' }, { status: 400, headers });
      }
    } else {
      return NextResponse.json({ error: 'No data found in S3' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching data from S3:', error);
    return NextResponse.json({ error: 'Failed to fetch data from S3' }, { status: 500 });
  }
}
