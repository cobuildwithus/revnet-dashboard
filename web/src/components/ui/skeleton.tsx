export const SkeletonLoader = ({
  count,
  height,
}: {
  count: number;
  height: number;
}) => (
  <div className="space-y-2">
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} height={height} width="100%" />
    ))}
  </div>
);
export const Skeleton = ({
  height,
  width = "100%",
  rounded = "rounded-xl",
}: {
  height: number;
  width?: string;
  rounded?: string;
}) => (
  <div
    style={{ width, height }}
    className={`w-full animate-pulse bg-gray-200 dark:bg-gray-600 ${rounded}`}
  />
);
