
import Link from "next/link"

export default function Home() {
  
  return (
    <>

      <main className="flex min-h-screen flex-col items-center" >
        <div className="relative flex place-items-center p-5 bg-white text-black">
        <Link href="/contact">Contact Me</Link>
        </div>
  

      </main>
    </>

  )
}
