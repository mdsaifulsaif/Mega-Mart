"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) setProducts(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading products...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <div className="flex flex-col justify-start items-start mb-4">
        <h2 className="text-2xl font-bold">
          Our <span className="text-[#129990]">Products</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {products.map((p) => (
          // Inside map loop
          <Link key={p._id} href={`/product/${p._id}`}>
            <div className="  hover:shadow-lg transition  bg-white border border-gray-200 rounded-lg p-3 shadow-sm relative flex-shrink-0">
              <div className="relative">
                <img
                  src={p.image || "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-40 object-contain mb-2"
                />
                <span className="absolute top-2 right-2 bg-[#129990] text-white text-xs px-2 py-1 rounded">
                  {p.discount || "0%"} OFF
                </span>
              </div>

              <h2 className="font-semibold text-sm mb-1">{p.name}</h2>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base">₹{p.price}</span>
                {p.oldPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ₹{p.oldPrice}
                  </span>
                )}
              </div>
              {p.oldPrice && (
                <p className="text-green-500 text-sm mt-1">
                  Save - ₹{p.oldPrice - p.price}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
