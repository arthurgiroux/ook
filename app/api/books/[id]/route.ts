import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string | undefined } }
) {
  const bookId = params.id;
  try {
    const book = await prisma.book.findUnique({
      where: { id: String(bookId) },
    });

    if (book) {
      return new Response(JSON.stringify(book), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Book not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.log(
      `Internal error while getting book with id '${bookId}': ${error}`
    );
    return new Response(JSON.stringify({ message: "Error getting book" }), {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string | undefined } }
) {
  const bookId = params.id;
  try {
    const book = await prisma.book.delete({
      where: { id: String(bookId) },
    });
    return new Response(JSON.stringify(book), { status: 200 });
  } catch (error) {
    console.log(
      `Internal error while deleting book with id '${bookId}': ${error}`
    );
    return new Response(JSON.stringify({ message: "Error deleting book" }), {
      status: 500,
    });
  }
}
