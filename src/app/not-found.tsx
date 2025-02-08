import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404 Not Found</h1>
          <p className="py-6">
            Oops, the page you&apos;re looking for doesn&apos;t exist. Please
            continue to the top page.
          </p>
          <Link href="/" className="btn btn-primary">
            Return to top
          </Link>
        </div>
      </div>
    </div>
  );
}
