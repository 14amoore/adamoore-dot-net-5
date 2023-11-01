import Link from "next/link";

export default function StyledLink({route, linkType, routeText}: {route: string, linkType: string, routeText: string}) {
        if (linkType === 'external') {
           return <Link href={route} className="text-green-500 underline">{routeText}</Link>
        }
       return <Link className="text-fuchsia-500 underline" href={route}>{routeText}</Link>
    
}