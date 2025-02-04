export default async function Page() {
  return <div>Archives</div>;
}

export async function generateStaticParams() {
  return [
    {
      slug: '2025-01',
    },
  ];
}
