import express from 'express';
import {addUser,sendMsg} from '../controller/usercontroller.js';

const router = express.Router();

router.post('/register',addUser);
router.post("/msg",sendMsg);

export default router;