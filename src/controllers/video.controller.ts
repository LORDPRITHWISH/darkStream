// import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { asyncHandeler } from "../utils/asyncHandelers";




export const streamVideo = asyncHandeler(async (req, res) => {
    
    const VIDEO_DIR = path.resolve("DarkStorage");
    
    // const { folder } = req.query;
  const { filepath } = req.params;

  if (!filepath) {
    return res.status(400).send("❌ Filepath is required");
  }
  // const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const VideoPath = Buffer.from(filepath, "base64").toString("utf8");

  // normalize folder query param to a string (Express's ParsedQs may be present)
  // const folderStr =
  //   Array.isArray(folder) ? folder[0] : typeof folder === "string" ? folder : undefined;

  // console.log("it is in ", folderStr)

  // if (!filename) {
  //   return res.status(400).send("❌ Filename is required");
  // }

  // let filePath = "";

  // if (folderStr && typeof folderStr == "string" && folderStr.length > 0) {
  //     filePath = path.join(VIDEO_DIR, folderStr ?? "", filename);
  // }
  // else {
    // }

  const fullFilePath = path.join(VIDEO_DIR, VideoPath);

//   const filePath = path.join(VIDEO_DIR, folderStr, filename);

  if (!fs.existsSync(fullFilePath)) {
    return res.status(404).send("❌ Video not found");
  }

  const stat = fs.statSync(fullFilePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(fullFilePath).pipe(res);
  } else {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0] ?? "0", 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;
    const stream = fs.createReadStream(fullFilePath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });

    stream.pipe(res);
  }
});
