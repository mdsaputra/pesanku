import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "data.json");

  if (req.method === "POST") {
    const { date, time, activity } = req.body;
    if (!date || !time || !activity) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    let data = [];
    try {
      const file = fs.readFileSync(filePath, "utf8");
      data = JSON.parse(file);
    } catch (e) {
      data = [];
    }

    data.push({ date, time, activity, createdAt: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: "Method tidak diizinkan" });
}
