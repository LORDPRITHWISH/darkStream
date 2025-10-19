import { Router } from 'express';
import { Test } from '../controllers/action.controller';


const router = Router();

// router.use(verifyJwt);

// router.route("/getalluser").get(GetAllUsers);
// router.route("/getuser/:id").get(GetUser);
router.route("/test").get(Test);

export default router