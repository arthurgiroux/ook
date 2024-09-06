"use client";

import type { Metadata } from "next";

// These styles apply to every route in the application
import "./globals.css";

import { ThemeProvider } from "@material-tailwind/react";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{props.children}</ThemeProvider>
      </body>
    </html>
  );
}
