import { Router } from "express";
const router = Router();

import {
  getBlogList,
  addBlog,
  editBlog,
  getBlog,
  deleteBlog,
} from "../controllers/blogs.js";

router.get("/get/:id", getBlog);
router.get("/list", getBlogList);
// router.post("/add", addBlog);
// router.patch("/edit/:id", editBlog);
// router.delete("/delete/:id", deleteBlog);

export default router;
