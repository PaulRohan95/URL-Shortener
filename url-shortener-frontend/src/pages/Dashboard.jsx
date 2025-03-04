import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/urls`, { 
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`} 
        })
        .then(res => {
            setUrls(res.data);
            setLoading(false);
        })
        .catch(err => {
            setError("Failed to fetch URLs. Please try again.");
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-4">Your Shortened URLs</h2>

            {loading && <p className="text-blue-500">Loading URLs...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <ul className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg">
                    {urls.length > 0 ? (
                        urls.map(url => (
                            <li key={url.id} className="flex justify-between items-center border-b py-2">
                                <a 
                                    href={url.shortUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-600 hover:underline"
                                >
                                    {url.shortUrl}
                                </a>
                                <span className="text-gray-600 text-sm">Clicks: {url.clickCount}</span>
                                <span className="text-gray-600 text-sm">Expires: {url.expiryDate || "Never"}</span>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No URLs found. Try shortening a new one!</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
