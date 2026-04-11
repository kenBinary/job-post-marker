export function JobObserver<T extends Element>(
  threshold: number,
  rootMargin: string,
  getDelayMillis: () => number,
  markAsViewed: (elementToMark: T) => void,
) {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target as T;
          setTimeout(() => {
            markAsViewed(card);
          }, getDelayMillis());
        }
      });
    },
    {
      threshold: threshold,
      rootMargin: rootMargin,
    },
  );
}
