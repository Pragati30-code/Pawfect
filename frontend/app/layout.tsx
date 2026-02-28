import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Pawfect",
  description: "AI veterinary assistant and cat matchmaking for your pets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Ubuntu+Condensed&display=swap"
          rel="stylesheet"
        />
      </head>
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
              fontFamily: "'Montserrat', system-ui, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}