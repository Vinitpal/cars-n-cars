import { StatusCodes } from "http-status-codes";
import Blog from "../models/Blog.js";
import CustomError from "../errors/index.js";

const getBlogList = async (req, res) => {
  const blogs = await Blog.find({});
  res.status(StatusCodes.OK).json(blogs);
};

const getBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await Blog.findOne({ _id: blogId });
  if (!blog) {
    throw new CustomError.NotFoundError(`No blog with id : ${blogId}`);
  }
  res.status(StatusCodes.OK).json(blog);
};

const addBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(StatusCodes.CREATED).json(blog);
};

const editBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await Blog.updateOne({ _id: blogId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    throw new CustomError.NotFoundError(`No blog with id : ${blogId}`);
  }

  res.status(StatusCodes.OK).json({ blog });
};

const deleteBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await Blog.deleteOne({ _id: blogId });

  if (!blog) {
    throw new CustomError.NotFoundError(`No blog with id : ${blogId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: `Blog with id ${blogId} has been deleted` });
};

export { getBlog, getBlogList, addBlog, editBlog, deleteBlog };
