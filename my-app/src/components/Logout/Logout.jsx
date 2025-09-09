"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../Auth/Auth";
import { toast } from "react-toastify";

const Logout = () => {
  const router = useRouter();
  const { LogoutUser } = useAuth();
  const [isConfirming, setIsConfirming] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(false);
    setIsLoggingOut(true);
    LogoutUser();

    // redirect after short delay
    setTimeout(() => {
      router.push("/login");
      toast.success("Logged out successfully");
    }, 3000);
  };

  const handleCancel = () => {
    router.push("/dashboard"); // send back to dashboard if cancel
    // toast.success("Send back to dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm w-full">
        {isConfirming ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : isLoggingOut && (
          <>
            {/* Spinner */}
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Logging you out...
            </h2>
            <p className="text-gray-500 text-sm">
              Please wait while we safely log you out.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Logout;
