"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function VerifyEmail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/applicants/${params.id}/profile`);
        const userData = response.data;
        const userEmail = userData.applicant.email;
        setUserEmail(userEmail);
        
      } catch (error) {
        setError("User not found.");
      }
    };

    fetchUser();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/verify-email", {
        email: userEmail,
        verificationCode,
      });
      console.log(response)
      console.log(response?.data.status);
      if (response.data.status == 200) {
        router.push("/login");
      }
    } catch (error) {
      setError("Invalid verification code.");
    }
  };

  return (
    <div>
      <h1>Verify Your Email</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter verification code"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
