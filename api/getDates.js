import { list } from "@vercel/blob";

export const config = { runtime: "nodejs" };

export default async function handler() {
  try {
    // Cek apakah ada file data.json di blob
    const existing = await list();
    const file = existing.blobs.find((b) => b.pathname === "data.json");

    if (!file) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Ambil isinya
    const res = await fetch(file.url);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
