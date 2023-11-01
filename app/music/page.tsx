import { SPOTIFY_DATA_INPUT } from "@/utils/constants";
import { getS3Data } from "@/utils/get-s3-data"
import { getTopArtists } from '@/utils/getTopArtists'
import Link from "next/link";
import StyledLink from "@/components/StyledLink";
 
 async function getData () {
    const {access_token} = await getS3Data(SPOTIFY_DATA_INPUT)
    const topArtists = await getTopArtists(access_token)
    return topArtists
}

export default async function Spotify() {
    const data = await getData()
    const topArtistItem = data.items.map((artist: {id: string; name: string; uri: string}) => 
        <li className='mb-1' key={artist.id}><Link href={artist.uri}>{artist.name}</Link></li>
    )
    return (
      <div className="z-10 max-w-5xl w-full font-mono text-lg ">
        <h1 className='mb-3'>These are my top five Spotify artists:</h1>
        <ul>{topArtistItem}</ul>
        <StyledLink route={'/'} linkType={'Back'} routeText={'Back'}/>
      </div>   
    )
}