// import Script from 'next/script';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {/* Uncomment if adding a twitter widget */}
      {/* <Script
        async
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      ></Script> */}
    </>
  );
}
