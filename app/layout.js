
import "./globals.css";
import { Inter } from "next/font/google";

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { CartProvider } from "./CartContext";
import { PaymentProvider } from "./PaymentContext";

const inter = Inter({ subsets: ["latin"] });

export const Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="font-serif ">
        <SessionProvider session={session}>
          <CartProvider>
            <PaymentProvider>
            <div className="wrapper">
            <Navbar />
            <div className="mt-10 pt-7">
            {children}

            </div>
            <Footer/>
          </div>
            </PaymentProvider>
         
          </CartProvider>
         
        </SessionProvider>
      </body>
    </html>
  );
}