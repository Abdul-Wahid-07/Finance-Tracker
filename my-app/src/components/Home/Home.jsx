"use client";
import { BarChart3, Lock, TrendingUp, Wallet } from "lucide-react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Home = () => {
  // Demo chart data
  const chartData = {
    labels: ["Food", "Transport", "Bills", "Entertainment", "Savings"],
    datasets: [
      {
        label: "Monthly Spending",
        data: [4500, 2000, 3000, 1500, 5000],
        backgroundColor: [
          "#6366f1", // Indigo
          "#22c55e", // Green
          "#f97316", // Orange
          "#ec4899", // Pink
          "#14b8a6"  // Teal
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#4b5563", // Gray-700
        },
      },
    },
  };

  return (
    <main className="bg-gray-50 text-gray-800">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 md:py-20 px-4 bg-gradient-to-b from-indigo-500 to-purple-600 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Track Your Money. Achieve Your Goals.
        </h1>
        <p className="max-w-2xl text-base sm:text-lg opacity-90 mb-6">
          Smart, secure, and effortless tracking for your daily expenses and savings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="/signup" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 w-full sm:w-auto text-center">
            Get Started Free
          </a>
          <a href="#demo" className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 w-full sm:w-auto text-center">
            See How It Works
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Choose Our Tracker?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard icon={<Wallet className="w-8 h-8 md:w-10 md:h-10 text-indigo-500" />} title="Easy Expense Tracking" desc="Add and categorize expenses in seconds — no complicated forms." />
          <FeatureCard icon={<TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-green-500" />} title="Visual Insights" desc="Understand your spending with colorful, interactive charts." />
          <FeatureCard icon={<Lock className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />} title="Secure & Private" desc="Your data is encrypted and accessible only to you." />
        </div>
      </section>

      {/* Demo Preview with Chart */}
      <section id="demo" className="py-12 md:py-16 bg-gray-100 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">See It In Action</h2>
        <p className="max-w-xl mx-auto mb-8 text-gray-600 text-sm sm:text-base">
          Instantly visualize your finances. Here’s a sneak peek of our interactive dashboard.
        </p>
        
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 max-w-4xl mx-auto flex justify-center">
          {/* Smaller Pie Chart */}
          <div className="w-48 h-48 sm:w-56 sm:h-56">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Trusted by Users Worldwide</h2>
        <p className="text-gray-600 mb-6 md:mb-8 text-sm sm:text-base">
          From students to families — thousands rely on our app to stay on top of their money.
        </p>
        <blockquote className="bg-white shadow rounded-lg p-4 sm:p-6 italic text-gray-700 max-w-2xl mx-auto text-sm sm:text-base">
          "Helped me save ₹15,000 in just 3 months! Tracking my expenses has never been easier."
        </blockquote>
      </section>

      {/* Final CTA */}
      <section className="bg-indigo-600 text-white py-12 md:py-16 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
        <p className="mb-6 opacity-90 text-sm sm:text-base">
          Sign up today and start your journey towards financial freedom.
        </p>
        <a href="/signup" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 inline-block">
          Get Started Free
        </a>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-lg transition">
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{desc}</p>
    </div>
  );
}

export default Home;
