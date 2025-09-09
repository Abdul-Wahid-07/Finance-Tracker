"use client";
import { useAuth } from "@/components/Auth/Auth";
import Home from "@/components/Home/Home";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return (
      <>
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <h2 className="text-xl flex justify-center font-semibold text-gray-800 mb-2">Please wait..</h2>
      </>
    ) 
  }

  return <Home />;
};

export default page;
