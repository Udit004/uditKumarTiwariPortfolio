'use client'

import { useEffect, useRef } from 'react';

/**
 * Hook to lazy-load videos using Intersection Observer
 * Videos only autoplay when 75% visible in viewport
 */
export const useVideoLazyLoad = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Scroll into view - start playing
            video.play().catch(() => {
              // Autoplay may fail due to browser policy, user interaction required
            });
          } else {
            // Out of view - stop playing
            video.pause();
          }
        });
      },
      {
        threshold: 0.75, // 75% visible before playing
      }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return videoRef;
};
