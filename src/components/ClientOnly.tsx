import { useEffect, useState, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Component that only renders its children on the client
const ClientOnly: React.FC<ClientOnlyProps> = ({ children, fallback = null }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : <>{fallback}</>;
};

export default ClientOnly;
