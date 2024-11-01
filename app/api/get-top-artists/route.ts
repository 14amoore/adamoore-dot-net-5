// app/api/get-spotify-top-artists/route.ts
import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-provider-env';
import { SPOTIFY_DATA_INPUT } from '@/utils/constants';

const s3Client = new S3Client({ region: 'us-east-1', credentials: fromEnv() });

interface TopArtist {
  id: string;
  name: string;
  uri: string;
}

export async function GET() {
  try {
    // Fetch Spotify token from S3
    const s3Command = new GetObjectCommand(SPOTIFY_DATA_INPUT);
    const s3Response = await s3Client.send(s3Command);

    // Check if Body is defined and can be converted to a string
    if (!s3Response.Body) {
      throw new Error('S3 response Body is undefined');
    }
    const s3Data = JSON.parse(await s3Response.Body.transformToString());
    const { access_token } = s3Data;

    // Fetch top artists from Spotify
    const spotifyResponse = await fetch(
      'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!spotifyResponse.ok) {
      throw new Error('Failed to fetch top artists from Spotify');
    }

    const { items } = await spotifyResponse.json();
    const topArtists: TopArtist[] = items.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      uri: artist.uri,
    }));

    return NextResponse.json(topArtists);
  } catch (error) {
    console.error('Error in get-spotify-top-artists route:', error);
    return NextResponse.json({ error: 'Failed to fetch top artists' }, { status: 500 });
  }
}
