import { ObjectId } from "mongodb";
import dbconnection from "../../lib/mongodb";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

// Fetch data (Server Component)
export default async function ProductsPage() {
  const productCollection = await dbconnection("products");
  const products = await productCollection.find().toArray();

  if (!products.length) {
    return (
      <p className="text-center text-gray-500 mt-10">No products found!</p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-[#129990] text-white">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="text-center">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">₹{product.price}</td>
                <td className="px-4 py-2 border">{product.category || "-"}</td>
                <td className="px-4 py-2 border flex justify-center gap-4">
                  {/* Edit Button */}
                  <Link
                    href={`/dashboard/edit-product/${product._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </Link>

                  {/* Delete Button */}
                  <form
                    action={`/api/products/${product._id}/delete`}
                    method="POST"
                  >
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card Layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <span className="text-gray-500 text-sm">#{index + 1}</span>
            </div>
            <p className="text-gray-700">Price: ₹{product.price}</p>
            <p className="text-gray-600">
              Category: {product.category || "N/A"}
            </p>
            <div className="flex gap-6 mt-3">
              <Link
                href={`/dashboard/edit-product/${product._id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit />
              </Link>
              <form
                action={`/api/products/${product._id}/delete`}
                method="POST"
              >
                <button
                  type="submit"
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
