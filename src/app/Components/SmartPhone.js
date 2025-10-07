"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loading from "../Loading";

export default function SmartphoneSlider() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  // Fetch smartphone data from API
  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const res = await fetch("/api/products"); //
        const data = await res.json();

        if (data.success) {
          // শুধু ৫টা প্রোডাক্ট নিলাম
          setPhones(data.data.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching smartphones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl px-5 mx-auto mb-8 mt-20">
      {JSON.stringify(session)}
      {/* Title */}
      <div className="flex justify-between items-center mb-4 w-full">
        <h2 className="text-2xl font-bold">
          Grab the best deal on{" "}
          <span className="text-[#129990]">Smartphones</span>
        </h2>

        <Link
          href="/category/smartphones"
          className="text-blue-600 text-sm flex items-center"
        >
          View All &gt;
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {phones.map((phone) => (
          <Link
            key={phone._id}
            href={`/product/${phone._id}`}
            className="block"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm relative hover:shadow-md transition">
              {/* Discount badge */}
              {phone.discount && (
                <span className="absolute top-2 right-2 bg-[#129990] text-white text-xs px-2 py-1 rounded">
                  {phone.discount}
                </span>
              )}

              {/* Image */}
              <div className="relative w-full h-40 mb-2">
                <Image
                  src={phone.image || "/placeholder.png"}
                  alt={phone.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Info */}
              <h3 className="text-sm font-medium mb-1 truncate">
                {phone.name}
              </h3>
              <div className="flex items-center gap-2">
                <p className="font-semibold">₹{phone.price}</p>
                {phone.oldPrice && (
                  <p className="line-through text-gray-400 text-sm">
                    ₹{phone.oldPrice}
                  </p>
                )}
              </div>
              {phone.oldPrice && (
                <p className="text-green-600 text-xs mt-1">
                  Save - ₹{phone.oldPrice - phone.price}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
