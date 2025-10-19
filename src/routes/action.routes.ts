import { Router } from 'express';
import { getDirectoryContents, Test } from '../controllers/action.controller';


const router = Router();

router.route("/items").get(getDirectoryContents);
router.route("/test").get(Test);

export default router;