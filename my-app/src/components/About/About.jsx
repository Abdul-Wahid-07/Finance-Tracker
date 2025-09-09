"use client";
import Image from "next/image";

export default function About() {
  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-8">
          About Finance Tracker
        </h1>

        {/* Content Container */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Image */}
          <div className="flex justify-center">
            <Image
              src="/about-banner.png" // Place your about page image in /public
              alt="About Finance Tracker"
              width={500}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Right Side - Text */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Manage Your Finances Like a Pro
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Finance Tracker is your ultimate tool for tracking income, expenses, and savings all in one place. 
              Our mission is to make personal finance simple, transparent, and stress-free. Whether you’re budgeting 
              for the month, planning big purchases, or aiming for long-term goals, we’ve got you covered.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              With intuitive charts, real-time updates, and easy categorization, you can see exactly where your 
              money goes and how you can make it work harder for you. Plus, our secure platform ensures that your 
              financial data stays private and protected.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Start taking control of your money today and join thousands of users already improving their 
              financial health with Finance Tracker.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

