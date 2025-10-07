import { put } from "@vercel/blob";
import { nanoid } from "nanoid";

export const config = { runtime: "nodejs" };

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const body = await req.json();
    const id = nanoid();

    // Simpan JSON ke Blob
    const blob = await put(`data/${id}.json`, JSON.stringify(body, null, 2), {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: "application/json",
    });

    return Response.json({ success: true, url: blob.url });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}
