import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Sử dụng font Inter cho dễ đọc với người lớn tuổi
const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Công nghệ tuổi xế chiều",
  description: "Nền tảng hướng dẫn người cao tuổi sử dụng công nghệ số và ứng dụng di động",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.className} antialiased`}>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        {children}
      </body>
    </html>
  );
}
