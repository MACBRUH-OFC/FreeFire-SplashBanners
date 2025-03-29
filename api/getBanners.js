
const allowedOrigins = ["https://macbruh-freefire-splashbanners.vercel.app"];
export default async function handler(req, res) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.SECRET_API_KEY || !allowedOrigins.includes(req.headers.origin)) {
        return res.status(403).json({ error: "Unauthorized" });
    }
    
    export default async function handler(req, res) {
    const region = req.query.region;
    if (!region) {
        return res.status(400).json({ error: "Region parameter is required" });
    }
    
    try {
        const response = await fetch(`https://ff-banner-api.vercel.app/banner/filter?region=${region}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data from API");
        }
        
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
  // Keep user's existing logic
}
