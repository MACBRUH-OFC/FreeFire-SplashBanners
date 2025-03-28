
// Vercel Serverless API function to securely fetch banners
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { region } = req.body;
    if (!region) {
        return res.status(400).json({ error: "Region is required" });
    }

    // Secure API call (Real API is hidden in Vercel Environment Variables)
    const apiUrl = process.env.API_URL;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ region })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch banners.");
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
