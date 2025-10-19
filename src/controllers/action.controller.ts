import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandeler } from "../utils/asyncHandelers.js";
import { ApiResponce } from "../utils/ApiResponce.js";
// import { readdir } from "fs/promises";
// import { redisClient } from "../utils/redis.js";

import { readdir, stat } from "fs/promises";
import path from "path";

// async function getAllFiles(dir) {
//   const entries = await readdir(dir);
//   const files = await Promise.all(
//     entries.map(async (entry) => {
//       const filePath = path.join(dir, entry);
//       const info = await stat(filePath);
//       if (info.isDirectory()) {
//         return getAllFiles(filePath);
//       } else {
//         return filePath;
//       }
//     })
//   );
//   return files.flat();
// }

const Test = asyncHandeler(async (req, res) => {
//   const allFiles = await getAllFiles("./DarkStorage");
//   console.log(allFiles);
  // const items = await readdir("./DarkStorage");
  // // console.log(files);
  // const videoFiles = items.filter(file => file.endsWith(".mp4"));

  // const folder = items.filter(item => !item.includes("."));

  // console.log("Video Files:", videoFiles);
  // console.log("Folders:", folder);

  return res
    .status(200)
    .json(new ApiResponce(200, "Test route is working", { dark: "666" }));
});

export { Test };
