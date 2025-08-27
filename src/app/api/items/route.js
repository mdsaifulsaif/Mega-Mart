// /src/app/api/products/route.js
import dbconnection from "../../lib/mongodb";

export async function GET() {
  try {
    const collection = await dbconnection("products");
    const products = await collection.find({}).toArray(); // <-- এখানে JSON-able array
    return new Response(JSON.stringify({ success: true, data: products }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in GET /api/products:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
