import { getS3Data } from "@/utils/get-s3-data"
import  cloudCover from '@/utils/cloud-cover'
import Link from "next/link"

const input = {
  Bucket: 'amoore-nyc-weather',
  Key: 'weather.json'
}

export default async function Home() {
  const weather = await getS3Data(input);
  const {sky_hex_color, current_temp, cloudcover_percentage} = weather
  const clouds = cloudCover(cloudcover_percentage)
  const textColor = {
    color: sky_hex_color
  }
  
    
  return (
    <main className="flex flex-col z-10 max-w-5xl w-full font-mono text-lg justify-between sm:p-24 p-10 min-h-screen ">
      <div className="flex flex-col gap-y-2">
       <h1 className="mb-2">Hi!</h1>
       <h2>My name is Adam Moore</h2>
       <h3>I&apos;m a Software Engineer and Creative Techologist, with an MFA from Parsons School of Design.</h3>
       <h3>I&apos;m based in Brooklyn where it is currently {current_temp} degrees fahrenheit, with {clouds} skies.</h3>
       <h3>The sky is pretty close to hex color <span style={textColor}>{sky_hex_color}</span>.</h3>
       <h3>This is my portfolio website. It is, and most likely always will be, a work in progress</h3>
       <h3>For now take a gander at <Link className="text-fuchsia-500 underline" href='/music'>my top five Artists on Spotify.</Link></h3>
      </div>
    </main>
  )
}
