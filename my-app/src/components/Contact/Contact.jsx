"use client";
import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useAuth } from "../Auth/Auth";

// Lazy load Map component (client-only)
const Map = dynamic(() => import("../Map/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[300px] md:h-auto">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData({
        username: user.username,
        email: user.email,
        message: "",
      });
    }
  }, [user, isLoggedIn]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/contact`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        toast.success("Message sent successfully");
        setFormData({
          username: user?.username || "",
          email: user?.email || "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Have questions or feedback about our Personal Finance Tracker? We’d
            love to hear from you!
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                id="name"
                name="username"
                type="text"
                value={formData.username}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-2 px-4 rounded-lg transition duration-300 cursor-pointer
                ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-10 text-center text-gray-600">
            <p>
              Email:{" "}
              <span className="text-indigo-600">
                support@financetracker.com
              </span>
            </p>
          </div>
        </div>

        {/* Google Map (Lazy Loaded) */}
        <Map />
      </div>
    </main>
  );
};

export default Contact;
