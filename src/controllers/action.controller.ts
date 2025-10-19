import mongoose, {isValidObjectId} from "mongoose"
import {ApiError} from "../utils/ApiError.js"
import { asyncHandeler } from "../utils/asyncHandelers.js"
import { ApiResponce } from "../utils/ApiResponce.js";
// import { redisClient } from "../utils/redis.js";



const Test = asyncHandeler(async (req, res) => {

  return res.status(200).json(new ApiResponce(200, "Test route is working", { "dark": "666" }));
});

export {
  Test
}