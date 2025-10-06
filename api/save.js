export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = await req.json();

      // Simpan ke file JSON sederhana
      const fs = require("fs");
      const path = "./data.json";
      let existing = [];

      if (fs.existsSync(path)) {
        existing = JSON.parse(fs.readFileSync(path, "utf-8"));
      }

      existing.push({
        ...body,
        createdAt: new Date().toISOString(),
      });

      fs.writeFileSync(path, JSON.stringify(existing, null, 2));

      return res.status(200).json({ message: "Data berhasil disimpan ❤️" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
