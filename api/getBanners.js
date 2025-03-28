export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    let body;
    try {
        body = JSON.parse(req.body);
    } catch (error) {
        return res.status(400).json({ error: "Invalid JSON payload" });
    }

    const { region } = body;
    if (!region) {
        return res.status(400).json({ error: "Region parameter is required" });
    }

    try {
        const response = await fetch(`https://ff-banner-api.vercel.app/banner/filter?region=${encodeURIComponent(region)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data from API");
        }

        const data = await response.json();
        res.status(200).json({ banners: data });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
