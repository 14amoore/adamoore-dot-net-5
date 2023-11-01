import Link from "next/link"
import StyledLink from "@/components/StyledLink"

export default function MoreInfo() {
    return (
        <div className="flex flex-col gap-y-2">
            <h1>Feeling a bit curious?</h1>
            <h2>To get the data regarding the weather I&apos;m using the API provided by <StyledLink route={'https://open-meteo.com'} linkType={'external'} routeText={'Open-meteo'} />.</h2>
            <h2>To get the approximate color of the sky I&apos;m scraping <StyledLink route={'https://nskyc.com/'} linkType={'external'} routeText={'NSKYC'}/>.</h2>
            <h2>Open-meteo is queried and NSKYC is scraped once per hour. This is all handled by an AWS Lambda function. The data returned by the Lambda function is then stored in an AWS S3 bucket for easy access.</h2>
            <h2>The data from <StyledLink route={'https://www.spotify.com'} linkType={'external'} routeText={'Spotify'}/> is handled in a similar fashion. I use a Lambda function to refresh the token that allows me to access Spotify&apos;s API. The token is stored in another S3 bucket. The app uses the token to query Spotify&apos;s API and retrieves my top five artists.</h2>
            <h2>This app is built using <StyledLink route={'https://nextjs.org/'} linkType={'external'} routeText={'Next.js'}/>, <StyledLink route={'https://www.typescriptlang.org/'} linkType={'external'} routeText={'Typescript'}/>, and <StyledLink route={'https://tailwindcss.com/'} linkType={'external'} routeText={'Tailwind CSS'}/>.</h2>
            <h2>The app itself is hosted by <StyledLink route={'https://vercel.com/'} linkType={'external'} routeText={'Vercel'}/>.</h2>
            <StyledLink route={'/'} linkType={'back'} routeText={'Back'}/>
        </div>
    )
}