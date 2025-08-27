import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../Components/Navber";
import Footer from "../Components/Footer";



export default function HomeLayout({ children }) {
  return (
    < >
     
        <Navbar />
        {children}
        <Footer />
     
    </>
  );
}
