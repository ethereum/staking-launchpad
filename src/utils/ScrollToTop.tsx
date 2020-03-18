import { useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";

const ScrollIntoView = ({
  children,
  location
}: {
  children?: any;
  location?: any;
}) => {
  const prevLocation = useRef();

  useEffect(() => {
    if (prevLocation.current !== location.pathname) {
      window.scrollTo(0, 0);
      prevLocation.current = location.pathname;
    }
  }, [location]);

  return children;
};

export default withRouter(ScrollIntoView);
