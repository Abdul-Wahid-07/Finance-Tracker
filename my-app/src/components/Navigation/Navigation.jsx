"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../Auth/Auth";
import { Menu } from "lucide-react";

const Navigation = () => {
  const r = useRouter();
  const { isLoggedIn } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignupRedirect = () => r.push("/signup");
  const handleLoginRedirect = () => r.push("/login");
  const handleLogoutRedirect = () => r.push("/logout");

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo & Title */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Finance Tracker Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-indigo-600">
            Finance Tracker
          </span>
        </div>

        {/* Desktop Menu */}
        <nav>
          <ul className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
            {isLoggedIn ? (
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition">
                  Home
                </Link>
              </li>
            ) : (
              <li>
                <Link href="/" className="hover:text-indigo-600 transition">
                  Home
                </Link>
              </li>
            )}

            <li>
              <Link href="/about" className="hover:text-indigo-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-indigo-600 transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-indigo-600 transition">
                Contact
              </Link>
            </li>

            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogoutRedirect}
                  type="button"
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={handleSignupRedirect}
                    type="button"
                    className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                  >
                    SignUp
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLoginRedirect}
                    type="button"
                    className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                  >
                    Login
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <ul className="flex flex-col p-4 space-y-3 text-gray-700 font-medium">
            {isLoggedIn ? (
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition">
                  Home
                </Link>
              </li>
            ) : (
              <li>
                <Link href="/" className="hover:text-indigo-600 transition">
                  Home
                </Link>
              </li>
            )}
            <li>
              <Link href="/about" className="hover:text-indigo-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-indigo-600 transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-indigo-600 transition">
                Contact
              </Link>
            </li>

            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogoutRedirect}
                  type="button"
                  className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={handleSignupRedirect}
                    type="button"
                    className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                  >
                    SignUp
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLoginRedirect}
                    type="button"
                    className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                  >
                    Login
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navigation;
