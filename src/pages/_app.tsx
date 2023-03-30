import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "~/components/Header";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <div className="h-screen overflow-y-scroll">
    <Header />
    
    <Component {...pageProps} />
  </div>
  
  )
};

export default api.withTRPC(MyApp);
