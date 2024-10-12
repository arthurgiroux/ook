"use client";

// These styles apply to every route in the application
import "./globals.css";

import { ThemeProvider } from "@material-tailwind/react";
import Sidebar from "./components/sidebar";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="flex h-full bg-gray-900">
            <Sidebar />
            {/* Main Content */}
            <main className="flex-1 p-6 h-screen overflow-y-auto">
              {props.children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
