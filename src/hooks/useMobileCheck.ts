import React from 'react';

const useMobileCheck = (maxWidth: string) => {
  // Stores whether or not the screen is in a mobile state
  const [isMobile, setMobile] = React.useState<boolean>(false);

  // Set up an effect that uses JS media queries to switch between
  // mobile and desktop styles
  React.useEffect(() => {
    if (window.matchMedia) {
      const query = window.matchMedia(`(max-width: ${maxWidth})`);
      const setMobileFromQuery = (q: MediaQueryList) => setMobile(q.matches);
      query.removeListener(setMobileFromQuery as any);
      query.addListener(setMobileFromQuery as any);
      setMobileFromQuery(query);
      return () => query.removeListener(setMobileFromQuery as any);
    }
    return undefined;
    // eslint-disable-next-line
  }, []);

  return isMobile;
};

export default useMobileCheck;
