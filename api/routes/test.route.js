import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";
import { shouldBeLoggedIn, shouldBeAdmin } from "../controller/test.controller.js";

const router=express.Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);

router.get("/should-be-admin", shouldBeAdmin);


export default router;