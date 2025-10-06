"use client";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import CategoryModal from "../../Components/CategoryModal";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });

  // for modal
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  //  Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/category");
      setCategories(res.data.data || []);
      console.log(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/category", formData);
      if (res.data.success) {
        toast.success("Category added successfully!");
        setFormData({ name: "", slug: "", description: "", image: "" });
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    }
  };

  return (
    <div className=" mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-700 mb-3 sm:mb-0">
          🛍️ Category Management
        </h1>
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition"
        >
          <FaPlusCircle /> Add Category
        </button>
      </div>

      <div>
        <CategoryModal
          open={open}
          onCloseModal={onCloseModal}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>

      {/* Category Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full border-collapse">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Slug</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Featured</th>
              <th className="p-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  Loading categories...
                </td>
              </tr>
            ) : categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                  </td>
                  <td className="p-2 font-semibold">{cat.name}</td>
                  <td className="p-2">{cat.slug}</td>
                  <td className="p-2 max-w-xs truncate">
                    {cat.description || "-"}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        cat.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    {/* {cat.isFeatured ? "✅" : ""} */}
                    {/* <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                      <label className="label">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="toggle"
                        />
                      </label>
                    </fieldset> */}
                    <label className="label">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="toggle"
                      />
                    </label>
                  </td>
                  <td className="p-2 text-gray-500 text-sm">
                    {/* {new Date(cat.createdAt).toLocaleDateString()} */}
                    <div className="flex items-center gap-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        className="text-green-600 hover:text-green-800 transition"
                        title="View"
                      >
                        <FaEye size={18} />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
