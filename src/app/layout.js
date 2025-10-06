import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "../Provider/NextAuthSessionProvider";
// import Navbar from "./Components/Navber";
// import Footer from "./Components/Footer";
import { ToastContainer, toast } from "react-toastify";
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <NextAuthSessionProvider>
        <body>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </body>
        {/* <ToastContainer /> */}
      </NextAuthSessionProvider>
    </html>
  );
}
