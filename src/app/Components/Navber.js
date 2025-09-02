"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import Login from "./Login";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // 👇 ei function ta link click korle menu close kore dibe
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="z-10 mb-5 w-full bg-gray-100 dark:bg-gray-800 shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-bold text-[#129990] ">
          Mega Mart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link
            href="/login"
            className="px-3 py-1 bg-[#129990] text-white rounded hover:bg-[#129990]"
          >
            Login
          </Link>
          <Login />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-700 dark:text-white"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-gray-100 dark:bg-gray-800">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="block hover:underline"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={handleLinkClick}
            className="block hover:underline"
          >
            Products
          </Link>
          <Link
            href="/dashboard"
            onClick={handleLinkClick}
            className="block hover:underline"
          >
            Dashboard
          </Link>
          <Link
            href="/login"
            onClick={handleLinkClick}
            className="block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </Link>

          {/* Example sign in/sign out button */}
          <button
            onClick={() => {
              signIn();
              handleLinkClick();
            }}
            className="block w-full text-left text-blue-500 hover:underline"
          >
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
}
