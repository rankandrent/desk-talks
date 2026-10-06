import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-site py-32 text-center">
      <p className="text-sm font-semibold tracking-widest text-sun-700 uppercase">404</p>
      <h1 className="mt-3 text-4xl font-semibold">This page went off-air.</h1>
      <p className="mt-4 text-ink-700">The page you’re looking for doesn’t exist or has moved.</p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </section>
  )
}
