import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';

interface AnimatedRouterOptions {
  /**
   * Show neural animation during navigation
   */
  enableNeuralEffect?: boolean;
  
  /**
   * Delay in milliseconds for the transition
   */
  transitionDelay?: number;
}

/**
 * Custom hook for animated routing with neural effects
 * This hook wraps Next.js router and adds transition animations
 */
const useAnimatedRouter = ({
  enableNeuralEffect = true,
  transitionDelay = 300,
}: AnimatedRouterOptions = {}) => {
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [neuralSource, setNeuralSource] = useState<[number, number] | null>(null);
  
  // Function to trigger navigation with neural effect
  const navigateTo = useCallback((
    href: string, 
    sourcePoint?: [number, number], 
    options?: { shallow?: boolean }
  ) => {
    // If neural animation is enabled and source point is provided
    if (enableNeuralEffect && sourcePoint) {
      // Save source point for neural effect
      setNeuralSource(sourcePoint);
      
      // Set route changing state
      setIsRouteChanging(true);
      
      // Create a neural interaction event
      const event = new CustomEvent('neural-interaction', {
        detail: {
          type: 'navigation',
          sourcePoint,
          targetUrl: href
        }
      });
      document.dispatchEvent(event);
      
      // Navigate after delay to allow for animation
      setTimeout(() => {
        router.push(href, undefined, options);
      }, transitionDelay);
    } else {
      // Regular navigation without effects
      router.push(href, undefined, options);
    }
  }, [router, enableNeuralEffect, transitionDelay]);
  
  // Handle route change events
  useEffect(() => {
    const handleStart = () => {
      setIsRouteChanging(true);
    };
    
    const handleComplete = () => {
      setIsRouteChanging(false);
      setNeuralSource(null);
    };
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);
  
  return {
    router,
    isRouteChanging,
    neuralSource,
    navigateTo
  };
};

export default useAnimatedRouter;