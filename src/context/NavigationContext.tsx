import React, { createContext, useState, useContext, ReactNode } from 'react';
import NerveSignal from '@/components/animations/NerveSignal';

interface NavigationContextType {
  navigateTo: (targetId: string, sourceElementSelector?: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [nerveSignal, setNerveSignal] = useState<{
    startElement: string | null;
    endElement: string | null;
    key: number;
  }>({
    startElement: null,
    endElement: null,
    key: 0,
  });

  const navigateTo = (targetId: string, sourceElementSelector?: string) => {
    // If no source element is provided, use the current active element
    const sourceElement = sourceElementSelector || 
      (document.activeElement && document.activeElement.tagName !== 'BODY' 
        ? `#${document.activeElement.id}` 
        : null);

    // Set nerve signal animation
    setNerveSignal({
      startElement: sourceElement,
      endElement: `#${targetId}`,
      key: Date.now(), // Force re-render
    });

    // Scroll to the target element after a delay
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800); // Delay matches the nerve signal animation duration
  };

  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
      {nerveSignal.startElement && nerveSignal.endElement && (
        <NerveSignal
          key={nerveSignal.key}
          startElement={nerveSignal.startElement}
          endElement={nerveSignal.endElement}
          duration={0.8}
          color="#6366f1"
          thickness={3}
          onComplete={() => {
            // Reset nerve signal after animation completes
            setNerveSignal({
              startElement: null,
              endElement: null,
              key: nerveSignal.key,
            });
          }}
        />
      )}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
