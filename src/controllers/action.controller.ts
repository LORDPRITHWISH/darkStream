import { readdir, stat } from "fs/promises";
import path, { relative } from "path";
import { asyncHandeler } from "../utils/asyncHandelers.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";

const BASE_DIR = "./DarkStorage"; // Root directory

const getDirectoryContents = asyncHandeler(async (req, res) => {
  const { folder = "" } = req.query; // e.g., ?currentPath=/videos

  const currentPath =
    typeof folder === "string"
      ? folder
      : Array.isArray(folder) && typeof folder[0] === "string"
      ? folder[0]
      : "";

  const targetPath = path.join(BASE_DIR, currentPath);

  try {
    const entries = await readdir(targetPath);
    const data = [];

    for (const entry of entries) {
      const fullPath = path.join(targetPath, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        data.push({
          id: fullPath,
          name: entry,
          type: "folder",
          relativePath: relative(BASE_DIR, fullPath),
        });
      } else if (
        stats.isFile() &&
        (entry.endsWith(".mp4") ||
          entry.endsWith(".mkv") ||
          entry.endsWith(".avi"))
      ) {
        data.push({
          id: fullPath,
          name: entry,
          type: "file",
          size: stats.size,
          relativePath: relative(BASE_DIR, fullPath),
          // createdAt: stats.birthtime,
          // updatedAt: stats.mtime,
        });
      }
    }

    return res
      .status(200)
      .json(new ApiResponce(200, "Directory fetched", data));
  } catch (err) {
    throw new ApiError(404, `Path not found: ${currentPath}`);
  }
});

const Test = asyncHandeler(async (req, res) => {
  // const original = "Hello World";

  const { folder } = req.query;

  console.log("value is :", folder);

  const encoded = typeof folder === "string" ? folder : "";

  // const encoded = Buffer.from(original, "utf8").toString("base64");
  // const

  // console.log("encoded", encoded);

  // const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  // const decoded = "lol";

  return res
    .status(200)
    .json(new ApiResponce(200, "Test successful", { message: decoded }));
});

export { getDirectoryContents, Test };
