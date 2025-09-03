"use client";

import { useState } from "react";
import { registerUser } from "../actions/auth/registerUser";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // role add করলাম
    const payload = { ...form, role: "user" };

    const res = await registerUser(payload);
    if (res.success) {
      setMessage(`✅ User created with ID: ${res.insertedId}`);
      setForm({ name: "", email: "", password: "" }); // clear form
    } else {
      setMessage(`❌ ${res.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow rounded w-80 space-y-2"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className="bg-[#129990] text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}
