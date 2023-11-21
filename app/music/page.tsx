import { SPOTIFY_DATA_INPUT } from "@/utils/constants";
import { getS3Data } from "@/utils/get-s3-data"
import { getTopArtists } from '@/utils/get-top-artists'
import StyledLink from "@/components/StyledLink";

interface topArtist {
  id: string,
  name: string,
  uri: string
}
 
export default async function Spotify() {
  const data = await getS3Data(SPOTIFY_DATA_INPUT);
  if(data?.type === 'spotify') {
    const {access_token} = data
    const topArtists = await getTopArtists(access_token);
    const topArtistItem = topArtists.map((artist: topArtist) => 
      <li className='mb-1' key={artist.id}><StyledLink route={artist.uri} linkType={'external'} routeText={artist.name} /></li>
    )
    return (
      <div className="z-10 max-w-5xl w-full font-mono text-lg ">
        <h1 className='mb-3'>These are my top five Spotify artists:</h1>
        <ul>{topArtistItem}</ul>
        <StyledLink route={'/'} linkType={'Back'} routeText={'<-- Back'}/>
      </div>   
    )
  } else {
    return <div>No Artist Data Available</div>
  }
}