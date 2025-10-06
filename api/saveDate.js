import { put, list } from "@vercel/blob";

export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method === "POST") {
    try {
      const { date, time, activity } = await req.json();

      if (!date || !time || !activity) {
        return new Response(JSON.stringify({ error: "Data tidak lengkap" }), { status: 400 });
      }

      // Ambil semua data lama dari blob (jika ada)
      const existing = await list();
      let oldData = [];

      const file = existing.blobs.find((b) => b.pathname === "data.json");
      if (file) {
        const res = await fetch(file.url);
        oldData = await res.json();
      }

      // Tambah data baru
      const newData = [...oldData, { date, time, activity, createdAt: new Date().toISOString() }];

      // Simpan lagi ke blob
      await put("data.json", JSON.stringify(newData, null, 2), {
        access: "public",
        contentType: "application/json",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }

  if (req.method === "GET") {
    try {
      const existing = await list();
      const file = existing.blobs.find((b) => b.pathname === "data.json");

      if (!file) {
        return new Response(JSON.stringify([]), { status: 200 });
      }

      const res = await fetch(file.url);
      const data = await res.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ error: "Method tidak diizinkan" }), { status: 405 });
}
