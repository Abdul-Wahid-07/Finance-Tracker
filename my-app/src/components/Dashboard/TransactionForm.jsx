"use client";
import { useState } from "react";

const TransactionForm = ({
  form,
  handleChange,
  handleSubmit,
  editingId,
  resetForm,
}) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleSubmit(e); // call parent submit
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-4">
        {editingId ? "Edit Transaction" : "Add Income / Expense"}
      </h2>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="border rounded-xl p-2"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="border rounded-xl p-2"
            min={1}
          />
        </div>

        {/* Type */}
        <div className="flex flex-col">
          <label
            htmlFor="type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded-xl p-2 cursor-pointer"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category (only for expense) */}
        {form.type === "expense" && (
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="Category (Food, Rent, etc.)"
              value={form.category}
              onChange={handleChange}
              className="border rounded-xl p-2"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`rounded-xl px-4 py-2 text-white cursor-pointer ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? editingId
                ? "Updating..."
                : "Adding..."
              : editingId
              ? "Update Transaction"
              : "Add Transaction"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className={`rounded-xl px-4 py-2 text-white cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
