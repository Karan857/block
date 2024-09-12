import express from "express";
import {
  post,
  gets,
  get,
  edit,
  remove,
  postByID,
} from "../controllers/post.js";

const router = express.Router();

router.post("/post", post);
router.get("/posts", gets);
router.get("/post/:post_ID", postByID);
router.get("/post", get);
router.put("/post/:post_ID", edit);
router.delete("/post", remove);

export default router;
