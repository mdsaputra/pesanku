import { put, list } from "@vercel/blob";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { date, time, activity } = req.body;

      if (!date || !time || !activity) {
        return res.status(400).json({ error: "Data tidak lengkap" });
      }

      // Ambil semua data lama dari blob (jika ada)
      const existing = await list();
      let oldData = [];

      const file = existing.blobs.find((b) => b.pathname === "data.json");
      if (file) {
        const response = await fetch(file.url);
        oldData = await response.json();
      }

      // Tambah data baru
      const newData = [...oldData, { date, time, activity, createdAt: new Date().toISOString() }];

      // Simpan lagi ke blob
      await put("data.json", JSON.stringify(newData, null, 2), {
        access: "public",
        contentType: "application/json",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      const existing = await list();
      const file = existing.blobs.find((b) => b.pathname === "data.json");

      if (!file) {
        return res.status(200).json([]);
      }

      const response = await fetch(file.url);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method tidak diizinkan" });
}
