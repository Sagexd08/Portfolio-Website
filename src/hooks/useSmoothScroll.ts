import { useEffect } from 'react';

interface SmoothScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
  onlyHashLinks?: boolean;
}

export const useSmoothScroll = ({
  offset = 0,
  behavior = 'smooth',
  onlyHashLinks = true,
}: SmoothScrollOptions = {}) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      // Check if it's a hash link
      const href = anchor.getAttribute('href');
      if (!href) return;
      
      // If onlyHashLinks is true, only handle hash links
      if (onlyHashLinks && !href.startsWith('#')) return;
      
      // If it's an external link, don't handle it
      if (href.startsWith('http')) return;
      
      // Get the target element
      const targetId = href.startsWith('#') ? href.substring(1) : href;
      const targetElement = document.getElementById(targetId);
      
      if (!targetElement) return;
      
      e.preventDefault();
      
      // Calculate the target position with offset
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      
      // Scroll to the target position
      window.scrollTo({
        top: targetPosition,
        behavior,
      });
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [offset, behavior, onlyHashLinks]);
};

export default useSmoothScroll;
