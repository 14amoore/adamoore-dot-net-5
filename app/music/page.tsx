import { getS3Data } from "@/utils/get-s3-data"
import Link from 'next/link';

const input = {
  Bucket: 'amoore-spotify-bucket',
  Key: 'tokens.json'
}

const getTopArtists = async (token: string) => {
    const top_artists_url =
  'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    const response = await fetch(top_artists_url, { headers: headers });
    
    
    
    const artists = await response.json();
   
    
    return artists;
  };
 
 async function getData () {
    const {access_token} = await getS3Data(input)
    const topArtists = await getTopArtists(access_token)
    return topArtists
}

export default async function Spotify() {
    const data = await getData()
    const topArtistItem = data.items.map((artist: {id: string; name: string; uri: string}) => 
        <li className='mb-1' key={artist.id}><Link href={artist.uri}>{artist.name}</Link></li>
    )
    return (
        <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-10">
            <div className="z-10 max-w-5xl w-full font-mono text-lg ">
                    <h1 className='mb-3'>These are my top five Spotify artists:</h1>
                    <ul>{topArtistItem}</ul>
                    <h1><Link className="text-fuchsia-500 underline" href='/'>Back</Link></h1>
                </div>
           
        </main>
    )
}