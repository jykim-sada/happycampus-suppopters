export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbwdlcbtQ9hqdHXGsAq7wzuigYMuj_cGo2fnt8xYkHgxGqdbwQaRsc3KNAlAoSVwyMDz1g/exec";
  try {
    const payload = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
    const upstream = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: payload,
    });
    const text = await upstream.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(text);
  } catch (e) {
    return res.status(500).json({ success: false, error: String((e && e.message) || e) });
  }
}
