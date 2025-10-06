// api/saveDate.js
let savedDates = [];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { date, time, activity } = req.body;

    if (!date || !time || !activity) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    savedDates.push({ date, time, activity, createdAt: new Date().toISOString() });
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: "Method tidak diizinkan" });
}

// agar bisa diakses dari file lain
export function getSavedDates() {
  return savedDates;
}
