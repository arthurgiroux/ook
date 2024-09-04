/**
 * @jest-environment node
 */

import { GET, POST } from "@/app/api/books/route";
import { prismaMock } from "@/__mocks__/prisma";

describe("Books API", () => {
  it("should list all book", async () => {
    const books: any = [
      { id: "1", title: "Test Book", authorId: "123", isbn: "9781234567897" },
      { id: "2", title: "Test Book 2", authorId: "123", isbn: "9781234567898" },
    ];

    prismaMock.book.findMany.mockResolvedValueOnce(books);

    const response = await GET();
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toEqual(books);
  });

  it("should return 500 if an error occurs while listing all books", async () => {
    prismaMock.book.findMany.mockRejectedValueOnce(new Error("Unknown error"));

    const response = await GET();
    const body = await response.json();
    expect(response.status).toBe(500);
    expect(body).toEqual({ message: "Error getting books" });
  });

  it("should create a book", async () => {
    const book: any = {
      id: "1",
      title: "Test Book",
      authorId: "123",
      isbn: "9781234567897",
      publishedAt: "2021-01-01",
    };

    prismaMock.book.create.mockResolvedValueOnce(book);

    const request: any = {
      json: async () => book,
    };

    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body).toEqual(book);
  });

  it("should return 500 if an error occurs while creating a book", async () => {
    prismaMock.book.create.mockRejectedValueOnce(new Error("Unknown error"));

    const book: any = {
      id: "1",
      title: "Test Book",
      authorId: "123",
      isbn: "9781234567897",
    };

    const request: any = {
      json: async () => book,
    };

    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(500);
    expect(body).toEqual({ message: "Error creating book" });
  });

  it("should set publishedAt to null if not provided", async () => {
    const book: any = {
      id: "1",
      title: "Test Book",
      authorId: "123",
      isbn: "9781234567897",
    };

    prismaMock.book.create.mockResolvedValueOnce(book);

    const request: any = {
      json: async () => ({
        ...book,
        publishedAt: undefined,
      }),
    };

    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body).toEqual(book);
  });
});
