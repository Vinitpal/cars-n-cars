import dynamic from "next/dynamic";
const BlogCard = dynamic(() => import("../../components/Cards/BlogCard"));
import { useBlogQuery } from "../../store/service/api";

const Blog = () => {
  const { data: BlogList, isLoading: blogListLoading } = useBlogQuery();

  return (
    <div className="blog-page">
      <h2 className="header">Latest Blogs</h2>

      <div className="blog-card-container">
        {blogListLoading && <div>Loading...</div>}
        {!blogListLoading && BlogList.length === 0 && (
          <div>
            <h3 style={{ color: "#707070" }}>No Data Found</h3>
          </div>
        )}
        {!blogListLoading &&
          BlogList.map((blog, idx) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              url={`/blog/${blog.title}?id=${blog.id}`}
            />
          ))}
      </div>
    </div>
  );
};

export default Blog;
