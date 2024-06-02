import { MutableRefObject, useEffect, useRef, useState } from "react";

type LazyLoadCallback = () => void;

export const useLazyLoad = (
  callback: LazyLoadCallback
): [MutableRefObject<HTMLElement | null>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (callback) callback();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [callback]);

  return [observerRef, isVisible];
};
