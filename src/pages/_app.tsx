import { type AppType } from "next/dist/shared/lib/utils";
import { useEffect } from "react";

import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

import { DM_Sans } from "next/font/google";
import app from "@/lib/firebase";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    // Firebase is initialized when the app loads
    console.log("Firebase initialized:", app.name);
  }, []);

  return (
    <div lang={"en"} className={dmSans.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
