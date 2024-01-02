import { FC, useEffect, useState, useRef, ImgHTMLAttributes } from 'react';

import lazyImageLoader from '../../assets/loaders/lazyLoader.gif';
import handleImageError from '../../helper/imageErrorHandler';

export const LazyImage: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  ...imageProps
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const ref = imageRef.current;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref]);

  return (
    <img
      onError={handleImageError}
      {...imageProps}
      src={isLoaded ? imageProps.src : lazyImageLoader}
      loading='lazy'
      ref={imageRef}
    />
  );
};
