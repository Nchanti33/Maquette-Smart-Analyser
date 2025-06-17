import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing form data" });
    }
    const file = files.file as File;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileStream = fs.createReadStream(file.filepath);
    const formData = new FormData();
    formData.append("file", fileStream, file.originalFilename);

    const response = await fetch("https://api.dify.ai/v1", {
      method: "POST",
      headers: {
        Authorization: "app-3l2yJBxafYta2TTNJAyC3OQ0",
      },
      body: formData as any,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  });
}
