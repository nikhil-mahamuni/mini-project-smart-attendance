"use client";

import React, { useState, useEffect } from "react";
import { LockIcon, UserIcon } from "@/public/loginForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { teacherAuthAPI, teacherLoginAPI } from "@/app/_services/teacherAuth";

function Page() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleCredentialsChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmition(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const {email, password} = loginFormData
    try {
      await teacherAuthAPI( email, password, setMessage, router);
    } finally {
      setLoading(false);
      setLoginFormData({ teacherEmail: "", teacherPassword: "" });
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-2">
      <div className="max-w-md w-full">
        <div className="py-6 px-4 rounded-xl bg-white shadow">
          <h2 className="text-neutral-800 text-center text-3xl font-bold">
            Sign in
          </h2>
          {message && <p className="text-red-500">{message}</p>}
          <form className="mt-8 space-y-4" onSubmit={handleFormSubmition}>
            {/* Teacher Email */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Teacher Email
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  value={loginFormData.email || ""}
                  type="text"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-10 py-3 rounded-md outline-mediumPurpe"
                  placeholder="Enter userName"
                  onChange={handleCredentialsChange}
                />
                <UserIcon className="absolute top-1/2 -translate-y-1/2 left-3 size-5 text-faintPurple" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={loginFormData.password || ""}
                  required
                  onChange={handleCredentialsChange}
                  className="w-full text-gray-800 text-sm border border-gray-300 px-10 py-3 rounded-md outline-mediumPurpe"
                  placeholder="Enter password"
                />
                <LockIcon className="absolute top-1/2 -translate-y-1/2 left-3 size-5 text-faintPurple" />
              </div>
            </div>

            <div className="!mt-8">
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 px-4 text-sm tracking-wide rounded-lg text-white bg-purple-600 hover:bg-darkPurple focus:outline-none"
              >
                {loading ? "Logging in..." : "Login In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
