export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const region = req.query.region;
        if (!region) {
            return res.status(400).json({ error: "Region is required" });
        }

        const apiUrl = `https://ff-banner-api.vercel.app/banner/filter?region=${region}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
