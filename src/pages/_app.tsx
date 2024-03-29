import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import HelpcatPageLoader from "~/components/HelpcatPageLoader";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

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
    <ClerkProvider publishableKey="pk_live_Y2xlcmsuaGVscGNhdC5pbyQ">
      <Head>
        <title>Helpcat</title>
        <meta name="description" content="Helpcat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen overflow-y-scroll">
        {loading ? (
          <HelpcatPageLoader />
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
