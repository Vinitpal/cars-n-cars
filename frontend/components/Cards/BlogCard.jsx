import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ url, blog }) => {
  return (
    <Link href={url}>
      <a className="product-card blog-card">
        <div className="image-container">
          <Image
            src={blog.image}
            alt="buy used car at affordable price"
            layout="fill"
          />
        </div>
        <div className="content">
          <p className="date">
            -- {new Date(blog.date).toLocaleDateString("en-IN")}
          </p>
          <div className="text">
            <h3>{blog.title}</h3>
            <p>{blog.seoDesc.slice(0, 200) + "..."}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogCard;
