"use client";
import { useRouter } from "next/navigation";
import { BarChart3, Lock, TrendingUp, Wallet } from "lucide-react";
import { useAuth } from "../Auth/Auth";

const Footer = () => {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  return (
    <footer className="bg-gray-100 text-gray-700 border-t mt-8">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-blue-600">Personal Finance Tracker</h3>
          <p className="text-sm text-gray-600">
            Manage your money smarter — track income, expenses, and savings all in one place.
            Stay organized with visual insights and secure data.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-blue-600">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => router.push("/about")}
            >
              About
            </li>
            <li
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => router.push("/contact")}
            >
              Contact
            </li>
            <li
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => router.push("/services")}
            >
              Services
            </li>
            {isLoggedIn ? (
              <li
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => router.push("/logout")}
              >
                Logout
              </li>
            ) : (
              <>
              <li
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => router.push("/login")}
              >
                Login
              </li>
              <li
                className="hover:text-blue-500 cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Signup
              </li>
              </>
            )}
            
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-blue-600">Features</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-blue-600" /> Income & Expense Tracking
            </li>
            <li className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" /> Category-wise Charts
            </li>
            <li className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-600" /> Secure Authentication (JWT)
            </li>
            <li className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" /> Balance Overview
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm bg-gray-200 py-4 text-gray-600">
        &copy; {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
