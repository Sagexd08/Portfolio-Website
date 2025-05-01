import { useState, useEffect, RefObject } from 'react';

interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook for detecting when an element enters the viewport
 * Useful for triggering animations or lazy loading content
 *
 * @param elementRef The reference to the element to observe
 * @param options IntersectionObserver options and additional config
 * @returns isIntersecting Boolean indicating if the element is visible
 */
const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = true,
  }: IntersectionOptions = {}
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef?.current;

    // Early return if element ref is empty, not a valid DOM element, or browser doesn't support IntersectionObserver
    if (!element || !(element instanceof Element) || typeof IntersectionObserver !== 'function') {
      return undefined;
    }

    // If element is already visible and we want to freeze it, we're done
    if (isIntersecting && freezeOnceVisible) {
      return undefined;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]): void => {
      // We only care about the first entry (our target element)
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
    };

    // Create the observer with the provided options
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      root,
      rootMargin,
    });

    // Start observing the element
    observer.observe(element);

    // Clean up the observer when component unmounts
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  return isIntersecting;
};

export default useIntersectionObserver;
