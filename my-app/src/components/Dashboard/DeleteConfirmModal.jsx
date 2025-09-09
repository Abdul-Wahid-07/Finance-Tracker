"use client";

const DeleteConfirmModal = ({ showConfirm, setShowConfirm, handleDelete, deleteId }) => {
  if (!showConfirm) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this transaction? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowConfirm(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDelete(deleteId);
              setShowConfirm(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
