"use client";

import { Input } from "@material-tailwind/react";
import BookCard from "./components/bookcard";

export default function Page() {
  return (
    <>
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
            <BookCard key={i} id={i} author="Author" title="Title" />
          ))}
      </div>
    </>
  );
}
