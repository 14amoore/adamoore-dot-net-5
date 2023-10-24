import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-lg lg:flex">
       <h1>Hi!</h1>
       <h2>My name is Adam Moore</h2>
       <h3>I&apos;m a Software Engineer and Creative Techologist, with and MFA from Parsons School of Design. This is my portfolio website. It is, and most likely always will be, a work in progress.</h3>
       <h3>For now take a gander at my <Link href='/music'>top five Artists on Spotify.</Link></h3>
      </div>
    </main>
  )
}
