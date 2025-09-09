"use client";
import { Download } from "lucide-react";

const TransactionList = ({
  transactions,
  expandedMonths,
  toggleMonth,
  startEdit,
  setDeleteId,
  setShowConfirm,
  downloadPDF,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 lg:col-span-2 overflow-x-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <button
          onClick={downloadPDF}
          className="mt-2 sm:mt-0 w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-300 ease-in-out"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF</span>
        </button>
      </div>

      {transactions.length > 0 ? (
        Object.entries(
          transactions.reduce((acc, t) => {
            if (t.createdAt) {
              const d = new Date(t.createdAt);
              if (!isNaN(d)) {
                const month = d.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                });
                if (!acc[month]) acc[month] = [];
                acc[month].push(t);
              }
            }
            return acc;
          }, {})
        )
          .sort((a, b) => new Date(b[0]) - new Date(a[0]))
          .map(([month, txns], idx) => {
            const isExpanded = expandedMonths[month] || false;
            return (
              <div key={idx} className="mb-6">
                {/* Month Header */}
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  {month}
                </h3>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="p-3 border border-gray-200">Description</th>
                        <th className="p-3 border border-gray-200">Amount</th>
                        <th className="p-3 border border-gray-200">Type</th>
                        <th className="p-3 border border-gray-200">Created / Updated</th>
                        <th className="p-3 border border-gray-200 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
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
                              t.type === "income"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {t.type === "income" ? "+" : "-"}₹{t.amount}
                          </td>
                          <td className="p-3 border border-gray-200 capitalize">
                            {t.type}
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
                            <div className="flex justify-center gap-2">
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

                {/* Show More / Show Less */}
                {txns.length > 5 && (
                  <button
                    onClick={() => toggleMonth(month)}
                    className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
                  >
                    {isExpanded ? "Show Less" : "View All"}
                  </button>
                )}
              </div>
            );
          })
      ) : (
        <p className="text-gray-500">No transactions found</p>
      )}
    </div>
  );
};

export default TransactionList;
