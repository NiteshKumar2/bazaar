import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/navbar_components/Layout";
import Head from "next/head"; // Import Head component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bigbazar",
  description: "Bigbazar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo.png" type="image/png" /> {/* Add favicon */}
        <title>{metadata.title}</title> {/* Set the page title */}
        <meta name="description" content={metadata.description} /> {/* Add description */}
      </Head>
      <body className={inter.className}>
        <NextAuthProvider>
          {/* Optional: You can add a loading state here if necessary */}
          <Toaster />
          <Layout>
            {children}
          </Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
