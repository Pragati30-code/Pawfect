// frontend/src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Pawfect",
  description: "AI veterinary assistant for your pets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "hsl(0 0% 100%)",
              color: "hsl(240 10% 3.9%)",
              border: "1px solid hsl(240 5.9% 90%)",
              borderRadius: "8px",
              fontSize: "13px",
              fontFamily: "'Geist', system-ui, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}