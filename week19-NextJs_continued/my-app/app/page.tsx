
import Link from "next/link";
import React from "react";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Platform</h1>
        <p className="mb-4 text-gray-600">Your gateway to secure and smart solutions.</p>
        <Link href="/signup">
          <Button variant="primary" text="SignUp" />
        </Link>
        <Link href="/signin">
          <Button variant="primary" text="Signin" />
        </Link>

      </div>
    </div>
  );
}