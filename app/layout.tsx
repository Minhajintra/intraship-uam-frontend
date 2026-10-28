import type { Metadata } from "next";
import "./globals.css";

// Application metadata
export const metadata: Metadata = {
  title: "IntraShip — User & Access Management",
  description: "IntraShip User & Access Management (UAM) Enterprise Portal",
};

// Root Layout: Poori app ka main wrapper
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-clip">
      <body className="min-h-screen bg-[#f3f7f4] text-[#16382b] antialiased overflow-x-clip w-full max-w-full">
        {children}
      </body>
    </html>
  );
}
