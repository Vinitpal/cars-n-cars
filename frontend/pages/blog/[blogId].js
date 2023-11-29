import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { getBlog } from "../../lib/blog";
import Link from "next/link";

const BlogDetail = ({ blogData, next, prev }) => {
  const router = useRouter();

  const takeTo = (direction) => {
    router.push(`/blog/${direction.title}?id=${direction.id}`);
  };

  return (
    <div className="blog-detail-page">
      <Head>
        <title>{blogData.title}</title>
        <meta name="title" content={blogData.seo_title} />
        <meta name="description" content={blogData.seo_description} />
        <meta name="keywords" content={blogData.keywords} />
        <script type="application/ld+json" id="seoSchema">
          {blogData.seo_schema}
        </script>
      </Head>

      <h2 className="header">Latest Blogs</h2>

      <div className="image-container">
        <Image
          src={blogData.image}
          alt={blogData.title}
          width={720}
          height={560}
        />
      </div>

      <div className="content">
        <h3 className="title">{blogData.title}</h3>
        <p className="date">
          {new Date(blogData.date).toLocaleDateString("en-IN")}
        </p>

        {blogData.url && (
          <div className="source">
            <a href={blogData.url} target="_blank" rel="noreferrer">
              Source: {blogData.url}
            </a>
          </div>
        )}

        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        >
          {/* {blogData.content} */}
        </div>
      </div>

      <div className="navigation-btn-container">
        {prev.title && (
          <Link href={`/blog/${prev.title}?id=${prev.id}`}>
            <button className="prev">
              <div className="arrow-container">
                <BsArrowLeftShort className="icon" />
                <div className="arrow"></div>
              </div>
              Previous
            </button>
          </Link>
        )}
        {next.title && (
          <Link href={`/blog/${next.title}?id=${next.id}`}>
            <button className="next">
              Next
              <div className="arrow-container">
                <div className="arrow"></div>
                <BsArrowRightShort className="icon" />
              </div>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;

export async function getServerSideProps(context) {
  const id = context.query.id;

  const blogListApi = await getBlog();
  const blogList = blogListApi;
  const size = blogList.length - 1;

  // const blogDetail = blogList[id];
  const blogDetail = blogList.filter((blog) => blog.id === +id)[0];

  const next = id < size ? +id + 1 : id;
  const prev = id > 0 ? +id - 1 : 0;

  // console.log({ next }, { prev });
  return {
    props: {
      blogData: blogDetail,
      next: { id: next, title: blogList[next]?.title || null },
      prev: { id: prev, title: blogList[prev]?.title || null },
    },
  };
}
