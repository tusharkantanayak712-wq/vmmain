import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SocialFloat from "@/components/SocialFloat/SocialFloat";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "Vamp – MLBB Diamond Top Up | Instant & Secure",
  description:     "Vamp is a fast and secure Mobile Legends (MLBB) diamond top-up platform. Instant delivery, safe payments, and 24/7 automated service.",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer/>
              <SocialFloat />

      </body>
       <GoogleAnalytics gaId="G-7MQ5K05HZQ" />
       {/* <script src="https://quge5.com/88/tag.min.js" data-zone="191906" async data-cfasync="false"></script> */}
    </html>
  );
}
