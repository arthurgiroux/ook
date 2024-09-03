import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const books = await prisma.book.findMany();
    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    console.log(`Internal error while getting book: ${error}`);
    return new Response(JSON.stringify({ message: "Error getting books" }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const { isbn, title, authorId, description, genre, publishedAt } =
    await request.json();
  try {
    const book = await prisma.book.create({
      data: {
        isbn,
        title,
        authorId,
        description,
        genre,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    });
    return new Response(JSON.stringify(book), { status: 201 });
  } catch (error) {
    console.log(`Internal error while creating book: ${error}`);
    return new Response(JSON.stringify({ message: "Error creating book" }), {
      status: 500,
    });
  }
}
