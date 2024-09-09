import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { isbn } = await request.json();

    // We are using the "Read" API from OpenLibrary: https://openlibrary.org/dev/docs/api/read
    const response = await fetch(
      `http://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`
    );

    const data = await response.json();
    if (data?.records) {
      // Note: openlibrary has a very strange data model where the details are nested inside the details object
      const firstRecordDetails = (Object.values(data.records)[0] as any)
        ?.details?.details;
      if (firstRecordDetails) {
        var authorName: string = firstRecordDetails.authors?.[0].name;
        const { title, description } = firstRecordDetails;

        // We need to check if the author already exists in the database
        var authorId = await prisma.author.findFirst({
          where: {
            name: authorName,
          },
        });

        if (authorId) {
          console.log(`author found with ID: ${authorId}`);
        }
        // If the author does not exist, we need to create it
        else {
          console.log(`Creating author: ${authorName}`);
          authorId = await prisma.author.create({
            data: {
              name: authorName,
            },
          });
          console.log(`Created author with ID: ${authorId}`);
        }

        var book = await prisma.book.create({
          data: {
            isbn,
            title,
            description,
            authorId: authorId.id,
          },
        });

        return new Response(JSON.stringify(book), { status: 201 });
      }
    } else {
      console.log(`Couldn't get any information from openlibrary`);
      return new Response(
        JSON.stringify({
          message: "Error creating book: couldn't get information",
        }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.log(`Internal error while creating book: ${error}`);
    return new Response(JSON.stringify({ message: "Error creating book" }), {
      status: 500,
    });
  }
}
