export default async function handler(req, res) {
  if (req.method === "POST") {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "data.json");

    const newData = req.body;

    let existing = [];
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    existing.push({ ...newData, timeStamp: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
