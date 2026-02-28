

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/api";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(isLoggedIn() ? "/chat" : "/home");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}