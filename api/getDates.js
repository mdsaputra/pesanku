import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "data.json");

  try {
    const file = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(file);
    res.status(200).json(data);
  } catch {
    res.status(200).json([]);
  }
}
