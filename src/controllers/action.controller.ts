import { readdir, stat } from "fs/promises";
import path from "path";
import { asyncHandeler } from "../utils/asyncHandelers.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";

const BASE_DIR = "./DarkStorage"; // Root directory

const Test = asyncHandeler(async (req, res) => {
  const { folder = "" } = req.query; // e.g., ?currentPath=/videos

  const currentPath =
    typeof folder === "string" ? folder : Array.isArray(folder) && typeof folder[0] === "string" ? folder[0] : "";

  const targetPath = path.join(BASE_DIR, currentPath);

  try {
    const entries = await readdir(targetPath);
    const data = [];

    for (const entry of entries) {
      const fullPath = path.join(targetPath, entry);
      const stats = await stat(fullPath);

      data.push({
        name: entry,
        type: stats.isDirectory() ? "folder" : "file",
        relativePath: path.join(currentPath, entry), // for next traversal
        originalPath: fullPath, // absolute path
      });
    }

    return res
      .status(200)
      .json(new ApiResponce(200, "Directory fetched", data));
  } catch (err) {
    throw new ApiError(404, `Path not found: ${currentPath}`);
  }
});

export { Test };
