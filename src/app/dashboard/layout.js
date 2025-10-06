"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaPlus,
  FaList,
  FaTags,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Add Product", href: "/dashboard/add-product", icon: <FaPlus /> },
    { name: "All Products", href: "/dashboard/allproducts", icon: <FaList /> },
    { name: "Add Category", href: "/dashboard/add-category", icon: <FaTags /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white text-gray-800 shadow-md p-6 flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-md transition ${
                pathname === item.href
                  ? "bg-[#129990] text-white font-semibold"
                  : "hover:bg-[#0f7e77] hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-40 flex transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-8">Menu</h2>
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 rounded-md transition ${
                  pathname === item.href
                    ? "bg-[#129990] text-white font-semibold"
                    : "hover:bg-[#0f7e77] hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div
          className="flex-1 bg-black bg-opacity-30"
          onClick={() => setIsOpen(false)}
        ></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 mt-16 md:mt-0 w-full overflow-auto">
        {children || <h1 className="text-2xl font-bold">Welcome Admin</h1>}
      </main>
    </div>
  );
}
