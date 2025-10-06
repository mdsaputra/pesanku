// api/getDates.js
import { getSavedDates } from "./saveDate.js";

export default async function handler(req, res) {
  res.status(200).json(getSavedDates());
}
