import Link from "next/link";

interface LinkProps {
   route: string,
   linkType: string,
   routeText: string
}

export default function StyledLink({route, linkType, routeText}: LinkProps) {
        if (linkType === 'external') {
           return <Link href={route} className="text-green-500 underline">{routeText}</Link>
        }
       return <Link className="text-fuchsia-500 underline" href={route}>{routeText}</Link>
    
}