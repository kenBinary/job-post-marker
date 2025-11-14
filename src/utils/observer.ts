export function JobObserver<T extends Element>(
  threshold: number,
  rootMargin: string,
  delayMillis: number,
  markAsViewed: (elementToMark: T) => void
) {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target as T;
          setTimeout(() => {
            markAsViewed(card);
          }, delayMillis);
        }
      });
    },
    {
      threshold: threshold,
      rootMargin: rootMargin,
    }
  );
}
