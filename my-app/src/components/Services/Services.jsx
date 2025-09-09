import { BarChart3, Wallet, TrendingUp } from "lucide-react";

const Services = () => {
  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          We help you take control of your finances with smart tools and insights — all in one place.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Service Card 1 */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300">
            <BarChart3 className="text-indigo-500 w-12 h-12 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Expense Tracking</h2>
            <p className="text-gray-600">
              Keep track of every penny you spend and categorize expenses to understand where your money goes.
            </p>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300">
            <Wallet className="text-purple-500 w-12 h-12 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Budget Planning</h2>
            <p className="text-gray-600">
              Set monthly budgets and get alerts when you’re close to reaching your spending limits.
            </p>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300">
            <TrendingUp className="text-pink-500 w-12 h-12 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Financial Insights</h2>
            <p className="text-gray-600">
              Get personalized reports and insights to improve your financial health over time.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Services;
