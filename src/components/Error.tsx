import Link from 'next/link';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">An error occurred</h1>
          <div className="mockup-code w-full my-6">
            <pre>
              <code>{error.message}</code>
            </pre>
          </div>
          <Link href="/" className="btn btn-primary">
            Return to top
          </Link>
        </div>
      </div>
    </div>
  );
}
