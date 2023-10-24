import querystring from 'querystring';
import { getToken } from '../../utils/get-token'
import Link from 'next/link';

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
    const access_token = await getToken()
      
    const artists = await getTopArtists(access_token)

    console.log(artists);
    return artists
}

export default async function Spotify() {
    const data = await getData()
    const topArtistItem = data.items.map((artist: {id: string; name: string}) => 
        <li key={artist.id}>{artist.name}</li>
    )
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-lg lg:flex">
                <div>
                    <h1>These are my top five Spotify artists:</h1>
                </div>
                <div>
                    <ul>
                    {topArtistItem}
                    </ul>
                </div>
                <div>
                    <h1><Link href='/'>Back</Link></h1>
                </div>
            </div>
        </main>
    )
}