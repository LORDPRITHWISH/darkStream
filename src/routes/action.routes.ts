import { Router } from 'express';
import { Test } from '../controllers/action.controller';


const router = Router();

router.route("/test").get(Test);

export default router