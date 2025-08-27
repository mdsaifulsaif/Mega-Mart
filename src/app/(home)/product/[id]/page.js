// import dbconnection from "@/app/lib/mongodb";

import { ObjectId } from "mongodb";
import dbconnection from "../../../lib/mongodb";
import { FaStar, FaRegStar } from "react-icons/fa";

export default async function ProductDetail({ params }) {
  const { id } = params;

  try {
    const productCollection = await dbconnection("products");
    const product = await productCollection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return (
        <p className="text-center mt-10 text-red-500">Product not found!</p>
      );
    }

    const rating = Math.round(product.rating || 4);

    return (
      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div>
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg border"
          />
          {/* Thumbnail */}
          <div className="mt-4 flex gap-2">
            <img
              src={product.image || "/placeholder.png"}
              alt="thumb"
              className="w-20 h-20 object-contain border rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) =>
              i < rating ? (
                <FaStar key={i} className="text-[#129990] w-5 h-5" />
              ) : (
                <FaRegStar key={i} className="text-gray-300 w-5 h-5" />
              )
            )}
            <span className="ml-2 text-gray-600">
              ({product.rating || 4.5})
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-5">{product.description}</p>

          {/* Price */}
          <div className="mb-5">
            <p className="text-2xl font-semibold text-gray-900">
              ₹{product.price}
            </p>
            {product.oldPrice && (
              <p className="text-gray-400 line-through">₹{product.oldPrice}</p>
            )}
            {product.discount && (
              <p className="text-[#129990] font-medium">
                {product.discount} OFF
              </p>
            )}
          </div>

          {/* Extra Info */}
          <div className="space-y-1 mb-6 text-gray-700">
            <p>
              <span className="font-semibold">Brand:</span>{" "}
              {product.brand || "Generic"}
            </p>
            <p>
              <span className="font-semibold">Color:</span>{" "}
              {product.color || "Multi"}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category || "Other"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
              Add to Cart
            </button>
            <button className="flex-1 py-3 bg-[#129990] text-white font-semibold rounded-lg hover:bg-[#0f7e77] transition">
              Buy now
            </button>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return (
      <p className="text-center mt-10 text-red-500">Error fetching product!</p>
    );
  }
}
