import dbconnection from "../../lib/mongodb";

export async function GET() {
  try {
    const collection = await dbconnection("products");
    const products = await collection.find({}).toArray();
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

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("POST body:", body);

    const collection = await dbconnection("products");

    const result = await collection.insertOne(body);
    console.log("Inserted document:", result);

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in POST /api/products:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
