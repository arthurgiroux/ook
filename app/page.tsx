"use client";

import { Button } from "@material-tailwind/react";
import Sidebar from "@/app/components/sidebar";
import { Input } from "@material-tailwind/react";

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
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src="https://placehold.co/200x300"
                    alt="Book Cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-100">Book Title</h3>
                  <p className="mt-1 text-sm text-gray-400">Author</p>
                </div>
              </div>
            ))}
          </div>
        </main>
        </div>
  </>);
}
