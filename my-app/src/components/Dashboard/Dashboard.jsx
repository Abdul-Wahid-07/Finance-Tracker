"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Auth/Auth";

import PieChartComponent from "./Piechart";
import LineChartComponent from "./Linechart";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import DeleteConfirmModal from "./DeleteConfirmModal";

const Dashboard = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [data, setData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    transactions: [],
    categories: [],
  });
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "income",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [expandedMonths, setExpandedMonths] = useState({});
  const [userData, setUserdata] = useState({
    username: null,
    email: null,
  });
  const [trendData, setTrendData] = useState([]);

  //Modal states
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { user } = useAuth();

  //Ref for scrolling form into view
  const formRef = useRef(null);

  useEffect(() => {
    if (user) {
      setUserdata({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/auth/dashboard/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);

      //Group expenses by month
      const grouped = {};
      res.data.transactions.forEach((t) => {
        if (t.type === "expense" && t.createdAt) {
          const d = new Date(t.createdAt);
          if (!isNaN(d)) {
            const month = d.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
            grouped[month] = (grouped[month] || 0) + t.amount;
          }
        }
      });

      let formatted = Object.keys(grouped).map((month) => {
        const [mon, year] = month.split(" ");
        const date = new Date(`${mon} 1, ${year}`);
        return { month, spending: grouped[month], sortDate: date };
      });

      formatted = formatted
        .sort((a, b) => a.sortDate - b.sortDate)
        .map(({ month, spending }) => ({ month, spending }));

      setTrendData(formatted);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Form input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Submit transaction (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        // Update transaction
        const res = await axios.put(
          `${API_URL}/api/auth/transactions/update/${editingId}`,
          {
            description: form.description,
            amount: Number(form.amount),
            type: form.type,
            category: form.type === "expense" ? form.category : "Income",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 200) {
          toast.success("Transaction updated successfully");
          resetForm();
          fetchData();
        }
      } else {
        // Add transaction
        const res = await axios.post(
          `${API_URL}/api/auth/transactions/add`,
          {
            description: form.description,
            amount: Number(form.amount),
            type: form.type,
            category: form.type === "expense" ? form.category : "Income",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 201) {
          toast.success("Transaction added successfully");
          resetForm();
          fetchData();
        }
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to save transaction"
      );
    }
  };

  //Reset form
  const resetForm = () => {
    setForm({
      description: "",
      amount: "",
      type: "income",
      category: "",
    });
    setEditingId(null);
  };

  //Delete transaction
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/auth/transactions/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Transaction deleted");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete transaction");
    }
  };

  //Start editing transaction
  const startEdit = (txn) => {
    setForm({
      description: txn.description,
      amount: txn.amount,
      type: txn.type,
      category: txn.type === "expense" ? txn.category : "",
    });
    setEditingId(txn._id);

    //Scroll form into view on mobile & desktop
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  //Expand/Collapse months
  const toggleMonth = (month) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  //Download PDF
  const downloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/pdf/report`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
    }
  };

  return (
    <div className="p-4 md:p-8 grid gap-6">
      {/* Welcome Header */}
      {userData && (
        <div className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, <span className="text-blue-600">{userData.username}</span>
            </h1>
            <p className="text-gray-500">
              You are logged in as: <span className="text-blue-600">{userData.email}</span>
            </p>
          </div>
        </div>
      )}

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-2xl font-bold text-blue-600">₹{data.balance}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold">Income</h2>
          <p className="text-2xl font-bold text-green-600">₹{data.income}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="text-2xl font-bold text-red-600">₹{data.expenses}</p>
        </div>
      </div>

      {/* Add/Edit Transaction Form */}
      <div ref={formRef}>
        <TransactionForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId}
          resetForm={resetForm}
        />
      </div>

      {/* Charts + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartComponent categories={data.categories} />
        <LineChartComponent trendData={trendData} />
        <TransactionList
          transactions={data.transactions}
          expandedMonths={expandedMonths}
          toggleMonth={toggleMonth}
          startEdit={startEdit}
          setDeleteId={setDeleteId}
          setShowConfirm={setShowConfirm}
          downloadPDF={downloadPDF}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        handleDelete={handleDelete}
        deleteId={deleteId}
      />
    </div>
  );
};

export default Dashboard;
