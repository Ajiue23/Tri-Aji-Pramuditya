import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Tri Aji Pramuditya - UI/UX Designer & Developer",
  description: "Portfolio of Tri Aji Pramuditya, a UI/UX Designer and Developer specializing in creating beautiful, functional digital experiences.",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
