"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Recommendations({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/reco/${id}`);
        setRecommendations(response.data.recommendations.reverse());
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-12">
      <h1 className="text-5xl font-semibold">Recommendations</h1>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : (
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index}>
              <p>{recommendation.recommendation}</p>
              <p>Recruiter: {recommendation.recruiterName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
