import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/navbar_components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bigbazar",
  description: "Bigbazar",
  icons: {
    icon: "/logo1.png", // Add favicon using the Metadata API
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {/* Optional: You can add a loading state here if necessary */}
          <Toaster />
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
