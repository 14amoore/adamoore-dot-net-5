import { WEATHER_DATA_INPUT } from "@/utils/constants"
import { getS3Data } from "@/utils/get-s3-data"
import  cloudCover from '@/utils/cloud-cover'
import StyledLink from "@/components/StyledLink"
import DisplayColorElement from "@/components/DisplayColorElement"

export const dynamic = 'force-dynamic'




export default async function Home() {
  const weather = await getS3Data(WEATHER_DATA_INPUT);
  if(weather?.type === 'weather') {
    const {sky_hex_color, nyc_skyline_url, current_temp, cloudcover_percentage, day_or_night} = weather
    const clouds = cloudCover(cloudcover_percentage)
      return (
        <div className="flex flex-col gap-y-2">
          <h1 className="mb-2">Hi!</h1>
          <h2>My name is Adam Moore</h2>
          <h3>I&apos;m a Software Engineer and Creative Techologist, with an MFA from Parsons School of Design.</h3>
          <h3>I&apos;m based in Brooklyn where it is currently {current_temp} degrees fahrenheit, with {clouds} skies.</h3>
          <DisplayColorElement isDay={day_or_night} color={sky_hex_color} skylineUrl={nyc_skyline_url} />
          <h3>If you&apos;d like to know more about how this app works please <StyledLink route={'/more-info'} linkType={'internal'} routeText={'click here'} />.</h3>
          <h3>This is my portfolio website. It is, and most likely always will be, a work in progress</h3>
          <h3>For now take a gander at <StyledLink route={'/music'} linkType={'internal'} routeText={'my top five Spotify artists'} />.</h3>
        </div>
      )
    } else {
      <div className="flex flex-col gap-y-2">
          <h1 className="mb-2">Hi!</h1>
          <h2>My name is Adam Moore</h2>
          <h3>I&apos;m a Software Engineer and Creative Techologist, with an MFA from Parsons School of Design.</h3>
          <h3>I&apos;m based in Beuatiful Brooklyn.</h3>
          <h3>This is my portfolio website. It is, and most likely always will be, a work in progress</h3>
          <h3>For now take a gander at <StyledLink route={'/music'} linkType={'internal'} routeText={'my top five Spotify artists'} />.</h3>
        </div>
    }
}
