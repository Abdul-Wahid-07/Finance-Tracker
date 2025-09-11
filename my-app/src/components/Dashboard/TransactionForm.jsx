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
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="border rounded-xl p-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="border rounded-xl p-2"
          min={1}
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded-xl p-2 cursor-pointer"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {form.type === "expense" && (
          <input
            type="text"
            name="category"
            placeholder="Category (Food, Rent, etc.)"
            value={form.category}
            onChange={handleChange}
            className="border rounded-xl p-2"
          />
        )}
        <div className="flex gap-2 md:col-span-4">
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
