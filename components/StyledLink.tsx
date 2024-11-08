import Link from 'next/link';

type LinkType = 'internal' | 'external' | 'Back';

interface LinkProps {
  route: string;
  linkType: LinkType;
  routeText: string;
}

export default function StyledLink({ route, linkType, routeText }: LinkProps) {
  if (linkType === 'external') {
    return (
      <Link href={route} className="text-green-500 underline font-black">
        {routeText}
      </Link>
    );
  }
  return (
    <Link className="text-fuchsia-300 font-black underline" href={route}>
      {routeText}
    </Link>
  );
}
