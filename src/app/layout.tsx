import type { Metadata } from "next";
import { ReactQueryProvider } from "./hooks/queryprovide";
import "./globals.css";

export const metadata: Metadata = {
  title: "MJ Admin",
  description: "Admin dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
