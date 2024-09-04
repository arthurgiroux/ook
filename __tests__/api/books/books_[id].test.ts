/**
 * @jest-environment node
 */

import { GET, DELETE } from "@/app/api/books/[id]/route";
import { prismaMock } from "@/__mocks__/prisma";

describe("Books API", () => {
    it("should get a book", async () => {
        const book: any = {
            id: "1",
            title: "Test Book",
            authorId: "123",
            isbn: "9781234567897",
        };

        prismaMock.book.findUnique.mockResolvedValueOnce(book);

        const response = await GET({} as any, { params: { id: "1" } });
        const body = await response.json();
        expect(response.status).toBe(200);
        expect(body).toEqual(book);
    });

    it("should return 404 if book not found", async () => {
        prismaMock.book.findUnique.mockResolvedValueOnce(null);

        const response = await GET({} as any, { params: { id: "1" } });
        const body = await response.json();
        expect(response.status).toBe(404);
        expect(body).toEqual({ message: "Book not found" });
    });

    it("should return 500 if an error occurs while getting a book", async () => {
        prismaMock.book.findUnique.mockRejectedValueOnce(new Error("Unknown error"));

        const response = await GET({} as any, { params: { id: "1" } });
        const body = await response.json();
        expect(response.status).toBe(500);
        expect(body).toEqual({ message: "Error getting book" });
    });

    it("should delete a book", async () => {
        const book: any = {
            id: "1",
            title: "Test Book",
            authorId: "123",
            isbn: "9781234567897",
        };

        prismaMock.book.delete.mockResolvedValueOnce(book);

        const response = await DELETE({} as any, { params: { id: "1" } });
        const body = await response.json();
        expect(prismaMock.book.delete).toHaveBeenCalledWith({ where: { id: "1" } });
        expect(response.status).toBe(200);
        expect(body).toEqual(book);
    });

    it("should return 500 if an error occurs while deleting a book", async () => {
        prismaMock.book.delete.mockRejectedValueOnce(new Error("Unknown error"));

        const response = await DELETE({} as any, { params: { id: "1" } });
        const body = await response.json();
        expect(response.status).toBe(500);
        expect(body).toEqual({ message: "Error deleting book" });
    });
});