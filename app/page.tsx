import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-10">
      <div className="z-10 max-w-5xl w-full justify-between font-mono text-lg">
       <h1>Hi!</h1>
       <h2>My name is Adam Moore</h2>
       <h3>I&apos;m a Software Engineer and Creative Techologist, with an MFA from Parsons School of Design. This is my portfolio website. It is, and most likely always will be, a work in progress.</h3>
       <h3>For now take a gander at <Link className="text-fuchsia-500 underline" href='/music'>my top five Artists on Spotify.</Link></h3>
      </div>
    </main>
  )
}
