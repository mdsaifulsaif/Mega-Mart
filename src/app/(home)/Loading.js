// app/shop/loading.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    </div>
  );
}
