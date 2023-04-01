import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "~/components/Header";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import HelpcatPageLoader from "~/components/HelpcatPageLoader";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  
  return (
  <div className="h-screen overflow-y-scroll">
    {loading ? (
      <HelpcatPageLoader />
    ) : (
      <>
        <Header />
        
        <Component {...pageProps} />
      </>
    )}

  </div>
  
  )
};

export default api.withTRPC(MyApp);
