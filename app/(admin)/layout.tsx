import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Providers } from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Elite Motors - Premium Luxury Car Dealership",
  description:
    "Discover your dream car at Elite Motors. Premium luxury vehicles, exceptional service, and unmatched quality in every drive.",
  keywords:
    "luxury cars, premium vehicles, car dealership, BMW, Mercedes, Tesla, sports cars",
  authors: [{ name: "Elite Motors" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Elite Motors - Premium Luxury Car Dealership",
    description:
      "Discover your dream car at Elite Motors. Premium luxury vehicles, exceptional service, and unmatched quality in every drive.",
    type: "website",
    locale: "en_US",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable}`}>
      <head></head>
      <body className="font-poppins antialiased">
        {/* <Provider store={store}> */}
        <Providers>{children}</Providers>
        {/* </Provider> */}
      </body>
    </html>
  );
}
