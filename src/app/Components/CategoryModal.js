"use client";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default function CategoryModal({
  open,
  onCloseModal,
  formData,
  setFormData,
  handleSubmit,
}) {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      showCloseIcon={false}
      center
      classNames={{
        overlay: "bg-black bg-opacity-40",
        modal: "rounded-lg p-6 relative",
      }}
    >
      {/* Close Button */}
      <button
        onClick={onCloseModal}
        className="absolute top-2 right-2 font-bold p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Close Modal"
      >
        ✕
      </button>
      {/* Category Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-8 grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Category Name"
          className="border p-2 rounded-md focus:outline-emerald-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Slug"
          className="border p-2 rounded-md focus:outline-emerald-500"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        />

        <input
          type="text"
          placeholder="Image URL"
          className="border md:col-span-2 p-2 rounded-md focus:outline-emerald-500"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded-md focus:outline-emerald-500 md:col-span-2"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button
          type="submit"
          className="md:col-span-2 bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}
