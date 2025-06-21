import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export interface NavigationContextProps {
  prevPath: string | null;
  currentPath: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const NavigationContext = createContext<NavigationContextProps>({
  prevPath: null,
  currentPath: "/",
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setPrevPath(currentPath);
    setCurrentPath(location.pathname);
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <NavigationContext.Provider value={{ prevPath, currentPath }}>
      {children}
    </NavigationContext.Provider>
  );
};
