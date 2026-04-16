import { type LoaderFunctionArgs } from "@remix-run/node";
import path from "path";
import fs from "fs/promises";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const filePath = params["*"];
  if (!filePath) {
    throw new Response("Not Found", { status: 404 });
  }

  // Define the actual path to the file in the .generated directory
  const fullPath = path.join(process.cwd(), ".generated", filePath);

  try {
    const file = await fs.readFile(fullPath);
    
    // Determine content type based on extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = "application/octet-stream";
    
    if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".json") contentType = "application/json";

    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(`Failed to serve generated file: ${fullPath}`, error);
    throw new Response("Not Found", { status: 404 });
  }
};
