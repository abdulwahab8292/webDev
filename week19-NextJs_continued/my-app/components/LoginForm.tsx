"use client";
import React, { useState } from "react";
import axios from "axios";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

const LoginForm: React.FC = () => {
  const [form, setFormdata] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/signin", {
        email: form.email,
        password: form.password,
      });

      console.log("Login successful:", response.data);
      // Redirect or store token here
    } catch (error: any) {
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
      } else {
        console.error("Network error:", error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <InputField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <div className="mt-6">
        <Button
          variant="primary"
          text="Login"
          disabled={!form.email || !form.password}
        />
      </div>
    </form>
  );
};

export default LoginForm;