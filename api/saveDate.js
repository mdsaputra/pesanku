export default async function handler(req, res) {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(process.cwd(), "data.json");

  // Pastikan file ada
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  if (req.method === "POST") {
    const newData = req.body;
    const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    existing.push({ ...newData, timeStamp: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    res.status(200).json({ success: true });
  } 
  else if (req.method === "GET") {
    const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.status(200).json(existing);
  } 
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
