import "@/app/globals.css";
import AuthNavbar from "@/components/Auth/AuthNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication page",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mx-3">
        <main>
          <nav>
            <AuthNavbar />
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
