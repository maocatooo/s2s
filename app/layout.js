import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "s2s",
  description: "s2s",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full">
      <AntdRegistry>{children}</AntdRegistry></body>
    </html>
  );
}
