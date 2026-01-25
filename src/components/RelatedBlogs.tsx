import { Link } from "react-router-dom";

const RelatedBlogs = ({ blogs, currentSlug }: any) => {
  const related = blogs
    .filter((b: any) => b.slug !== currentSlug)
    .slice(0, 3);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Related Blogs</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {related.map((blog: any) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.slug}`}
            className="group"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="rounded-lg mb-3 group-hover:scale-105 transition"
            />
            <h3 className="font-medium">{blog.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedBlogs;