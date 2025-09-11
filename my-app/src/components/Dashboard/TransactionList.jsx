"use client";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

const TransactionList = ({
  transactions,
  startEdit,
  setDeleteId,
  setShowConfirm,
  downloadPDF,
}) => {
  // Group transactions by month
  const grouped = useMemo(() => {
    return transactions.reduce((acc, t) => {
      if (t.createdAt) {
        const d = new Date(t.createdAt);
        if (!isNaN(d)) {
          const monthKey = d.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          });
          if (!acc[monthKey]) acc[monthKey] = [];
          acc[monthKey].push(t);
        }
      }
      return acc;
    }, {});
  }, [transactions]);

  // Sorted months (latest first)
  const months = useMemo(() => {
    return Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
  }, [grouped]);

  // Current month index
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [expandedMonths, setExpandedMonths] = useState({});
  const [downloading, setDownloading] = useState(false);

  const currentMonth = months[currentMonthIndex];
  const txns = grouped[currentMonth] || [];
  const isExpanded = expandedMonths[currentMonth] || false;

  const handlePrev = () => {
    if (currentMonthIndex < months.length - 1) {
      setCurrentMonthIndex((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex((prev) => prev - 1);
    }
  };

  const toggleMonth = (month) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadPDF();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 lg:col-span-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 font-semibold px-4 py-2 rounded-xl shadow-md transition-all duration-300
            ${
              downloading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
            }`}
        >
          <Download className="w-5 h-5" />
          <span>{downloading ? "Downloading..." : "Download PDF"}</span>
        </button>
      </div>

      {months.length > 0 ? (
        <div>
          {/* Month header with arrows */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={handlePrev}
              disabled={currentMonthIndex === months.length - 1}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-0"
            >
              <ChevronLeft />
            </button>
            <h3 className="text-lg font-semibold text-blue-600 text-center">
              {currentMonth}
            </h3>
            <button
              onClick={handleNext}
              disabled={currentMonthIndex === 0}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-0"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="p-3 border border-gray-200">Description</th>
                  <th className="p-3 border border-gray-200">Amount</th>
                  <th className="p-3 border border-gray-200">Type</th>
                  <th className="p-3 border border-gray-200">Category</th>
                  <th className="p-3 border border-gray-200">Created / Updated</th>
                  <th className="p-3 border border-gray-200 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {(isExpanded ? txns : txns.slice(0, 5)).map((t, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="p-3 border border-gray-200 font-medium">
                      {t.description}
                    </td>
                    <td
                      className={`p-3 border border-gray-200 font-semibold ${
                        t.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}₹{t.amount}
                    </td>
                    <td className="p-3 border border-gray-200 capitalize">
                      {t.type}
                    </td>
                    <td className="p-3 border border-gray-200 capitalize">
                      {t.category}
                    </td>
                    <td className="p-3 border border-gray-200 text-sm text-gray-500">
                      {new Date(
                        t.updatedAt || t.createdAt
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => startEdit(t)}
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(t._id);
                            setShowConfirm(true);
                          }}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-3">
            {(isExpanded ? txns : txns.slice(0, 5)).map((t, i) => (
              <div
                key={i}
                className="p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t.description}</span>
                  <span
                    className={`font-semibold ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}₹{t.amount}
                  </span>
                </div>
                <div className="text-sm text-gray-600 capitalize mt-1">
                  {t.type} • {t.category}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(
                    t.updatedAt || t.createdAt
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => startEdit(t)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(t._id);
                      setShowConfirm(true);
                    }}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less */}
          {txns.length > 5 && (
            <button
              onClick={() => toggleMonth(currentMonth)}
              className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
            >
              {isExpanded ? "Show Less" : "View All"}
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No transactions found</p>
      )}
    </div>
  );
};

export default TransactionList;
