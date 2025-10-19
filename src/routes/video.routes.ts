import { Router } from "express";
import { streamVideo } from "../controllers/video.controller";
// import { streamVideo } from "../controllers/action.controller";

const router = Router();

// Stream a video by filename
router.get("/watch/:filepath", streamVideo);

export default router;
    