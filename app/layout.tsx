import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import Header from "@/components/Header/Header";

const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  loading: () => <div className="h-20 bg-black" />, // Placeholder
  ssr: true, // Keep SSR if needed, but load chunk separately
});

import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Vampettic – MLBB Diamond Top Up | Instant & Secure",
  description: "Vampettic is a fast and secure Mobile Legends (MLBB) diamond top-up platform. Instant delivery, safe payments, and 24/7 automated service.",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>

          <Header />
          <main className="pt-16">{children}</main>
          <Footer />

        </GoogleOAuthProvider>

      </body>
      <GoogleAnalytics gaId="G-8JZPY5CMZZ" />
      {/* <script src="https://quge5.com/88/tag.min.js" data-zone="191906" async data-cfasync="false"></script> */}
    </html>
  );
}

