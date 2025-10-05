"use client";

import Image from "next/image";
// import Banner from "";
import Smartphone from "../Components/SmartPhone";
import TopCategories from "../Components/TopCategories";
import TopElectronicsBrands from "../Components/TopElectronicsBrands";
import Navbar from "../Components/Navber";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";

export default function Home() {
  return (
    <div className="min-h-screen mx-auto ">
      <Banner />
      <Smartphone />
      <TopCategories />
      <TopElectronicsBrands />
    </div>
  );
}
