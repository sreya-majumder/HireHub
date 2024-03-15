"use client"

import { useRouter } from "next/navigation";

const VerifyEmailPage = () => {
  const router = useRouter();

  return (
    <div>
      <p>You are verified.</p>
      {/* Add a login button */}
      <button onClick={() => router.push("/login")}>Login</button>
    </div>
  );
};

export default VerifyEmailPage;
