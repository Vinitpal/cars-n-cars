import { Schema, model } from "mongoose";

const BlogSchema = new Schema(
  {
    seoTitle: { type: String, default: "" },
    seoDesc: { type: String, default: "" },
    keywords: { type: String, default: "" },
    seoSchema: { type: String, default: "" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: { type: String, default: "" },

    // increment id by 1
    id: { type: Number, default: 0, unique: true, index: true },
  },

  { timestamps: true }
);

BlogSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastBlog = await this.constructor.findOne(
      {},
      {},
      { sort: { id: -1 } }
    );
    this.id = lastBlog ? lastBlog.id + 1 : 1;
  }
  next();
});

export default model("Blog", BlogSchema);
