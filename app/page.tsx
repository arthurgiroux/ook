"use client";

import { Button } from "@material-tailwind/react";
import Sidebar from "@/app/components/sidebar";
import { Input } from "@material-tailwind/react";
import BookCard from "./components/bookcard";

export default function Page() {
  return (
    <>
      <div className="flex h-full bg-gray-900">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 p-6 h-screen overflow-y-auto">
          {/* Search bar */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search books..."
              className="w-full p-3 rounded-md bg-gray-500 text-gray-100"
            />
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Example Book Card */}
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <BookCard id={i} author="Author" title="Title" />
              ))}
          </div>
        </main>
      </div>
    </>
  );
}
