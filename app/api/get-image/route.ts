// app/api/get-image/route.ts
import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromEnv } from '@aws-sdk/credential-provider-env';
import { SKY_LINE_IMAGE_INPUT } from '../../../utils/constants';
import { Readable } from 'stream';

const client = new S3Client({ region: 'us-east-1', credentials: fromEnv() });

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on("data", (chunk) => chunks.push(chunk as Uint8Array));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", (err) => reject(err));
    });
};

export async function GET() {
    try {
        const command = new GetObjectCommand(SKY_LINE_IMAGE_INPUT);
        const { Body } = await client.send(command);

        if (Body instanceof Readable) {
            const buffer = await streamToBuffer(Body);
            const base64Image = buffer.toString('base64');
            const imageUrl = `data:image/png;base64,${base64Image}`;

            return NextResponse.json({ imageUrl });
        } else {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching image:", error);
        return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
    }
}
