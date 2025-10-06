export default async function handler(req, res) {
  const fs = require("fs");
  const path = "./data.json";

  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, "utf-8"));
    return res.status(200).json(data);
  } else {
    return res.status(200).json([]);
  }
}

