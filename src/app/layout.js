import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "./Components/Navber";
// import Footer from "./Components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
      // className={}
      >
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
