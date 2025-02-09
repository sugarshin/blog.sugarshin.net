export default function ArticleListSkeleton({ count }: { count: number }) {
  return Array.from({ length: count }, (_, i) => i + 1).map((i) => {
    return (
      <div className="mb-4 pt-4 border-b border-gray-200" key={i}>
        <div className="flex w-full flex-col gap-4 pt-4">
          <div className="skeleton h-10 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-48"></div>
        </div>
        <div className="flex w-full flex-col gap-4 pt-8 items-end">
          <div className="flex w-full flex-row gap-4 justify-end">
            <div className="skeleton h-6 w-24"></div>
            <div className="skeleton h-6 w-24"></div>
            <div className="skeleton h-6 w-24"></div>
          </div>
          <div className="flex w-full flex-row gap-4 justify-end pb-6">
            <div className="skeleton h-6 w-32"></div>
            <div className="skeleton h-6 w-32"></div>
          </div>
        </div>
      </div>
    );
  });
}
