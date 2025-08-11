// app/api/recipes/route.js
const BASE = "https://api.apilayer.com/spoonacular/recipes/complexSearch";

// IMPORTANT: keep this ONLY on the server 
const API_KEY = process.env.SPOONACULAR_API_KEY;


export async function GET(req) {
  if (!API_KEY) {
    return Response.json(
      { message: "Server misconfiguration: missing SPOONACULAR_API_KEY" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);

    // Set/ensure safe defaults server-side (you can tweak)
    const params = new URLSearchParams(searchParams);
    if (!params.has("number")) params.set("number", "8");
    if (!params.has("offset")) params.set("offset", "0");
    params.set("addRecipeInformation", "true");
    params.set("instructionsRequired", "true");
    params.set("addRecipeNutrition", "true");
    params.set("fillIngredients", "true");

    const url = `${BASE}?${params.toString()}`;

    const res = await fetch(url, {
      headers: { apikey: API_KEY },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json(
        { message: `Upstream error (${res.status})` },
        { status: res.status }
      );
    }

    // Spoonacular returns { results: [...], totalResults: n, ... }
    const data = await res.json();
    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Internal server error", error: String(err) },
      { status: 500 }
    );
  }
}
