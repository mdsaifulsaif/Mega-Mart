"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddProduct() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (product) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire({
          title: "Product added!",
          icon: "success",
          draggable: true,
          color: "#129990",
          confirmButtonColor: "#129990",
        });
        console.log("Product added:", data.data);
      } else {
        console.error("Error adding product:", data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-xl space-y-6"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-[#129990]">
        Add New Product
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="Enter product name"
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-[#129990]"
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            {...register("category", { required: true })}
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-[#129990]"
          >
            <option value="">-- Select Category --</option>
            <option value="smartphone">Smartphone</option>
            <option value="laptop">Laptop</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            {...register("price", { required: true, valueAsNumber: true })}
            type="number"
            placeholder="₹ Price"
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-[#129990]"
          />
        </div>

        {/* Old Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Old Price</label>
          <input
            {...register("oldPrice", { valueAsNumber: true })}
            type="number"
            placeholder="₹ Old Price"
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-[#129990]"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            {...register("image")}
            placeholder="https://example.com/product.jpg"
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-[#129990]"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Product Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Write a short product description..."
            rows={4}
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-[#129990]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#129990] text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
