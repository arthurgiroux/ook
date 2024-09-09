import prisma from "@/lib/prisma";
import path from "path";
import fetch from "node-fetch";
import fs from "fs";

const allowedImageTypes: Record<string, string[]> = {
  "image/jpeg": [".jpeg", ".jpg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
};

function isExtensionValid(filename: string, contentType: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return allowedImageTypes[contentType]?.includes(ext) ?? false;
}

async function downloadCoverImage(
  url: string,
  outputFileName: string
): Promise<void> {
  const fileName = path.basename(url);
  const outputFileNameWithExt = `${outputFileName}${path.extname(fileName).toLowerCase()}`;
  const outputImagePath = path.join(
    process.cwd(),
    "public",
    "images",
    "cover",
    outputFileNameWithExt
  );

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    if (contentType && isExtensionValid(fileName, contentType)) {
      const buffer = await response.arrayBuffer();

      fs.writeFileSync(outputImagePath, Buffer.from(buffer));
    } else {
      console.log(`Invalid extension for image, {}`);
    }
  } catch (error) {
    console.log(`Error while downloading cover image: {error}`);
  }
}

export async function POST(request: Request) {
  try {
    const { isbn } = await request.json();

    // We are using the "Read" API from OpenLibrary: https://openlibrary.org/dev/docs/api/read
    const response = await fetch(
      `http://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`
    );

    const data = (await response.json()) as any;
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

        const firstRecordData = (Object.values(data.records)[0] as any)?.data;
        const mediumCoverUrl = firstRecordData.cover?.medium;
        if (mediumCoverUrl) {
          console.log(`Downloading cover image ${mediumCoverUrl}`);
          await downloadCoverImage(mediumCoverUrl, book.id);
        }

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
