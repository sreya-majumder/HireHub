"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import NavRec from "@/components/NavRec";

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
    <>

    <NavRec />

    <div className="flex flex-col gap-2 min-h-screen bg-gradient-to-r text-transparent bg-clip-text animate-gradient">

      <h1 className="text-5xl text-black font-semibold mt-4 p-4">Recommendations</h1>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : (
        <ul>
          
          {recommendations.map((recommendation, index) => (
            <li key={index}>
              <div className="flex flex col bg-purple-200 border border-gray-400 rounded ml-2 mr-2 mt-2 p-3">
              <p className="text-black text-l">{recommendation.recruiterName} : {recommendation.recommendation}</p>
              <p className="text-black text-l"></p>
              </div>
            </li>
            
          ))}

        </ul>
      )}
    </div>


    </>
  );
}
