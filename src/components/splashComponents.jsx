import React, { useState, useEffect } from "react";
import SplashMessage from "./SplashMessage";

export function withSplashScreen(WrappedComponent) {
  function WithSplashScreen(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

    if (loading) return <SplashMessage />;

    return <WrappedComponent {...props} />;
  }

  WithSplashScreen.displayName = `WithSplash(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithSplashScreen;
}

export default withSplashScreen;
