"use client";
import React, { useState } from "react";
import axios from "axios";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

const SignupForm: React.FC = () => {
  const [form, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/signup", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      console.log("Signup successful:", response.data);
      // Redirect or store token here
    } catch (error: any) {
      if (error.response) {
        console.error("Signup failed:", error.response.data.message);
      } else {
        console.error("Network error:", error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

      <InputField
        label="First Name"
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
      />

      <InputField
        label="Last Name"
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
      />

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
          text="Sign Up"
          disabled={
            !form.firstName || !form.lastName || !form.email || !form.password
          }
        />
      </div>
    </form>
  );
};

export default SignupForm;
