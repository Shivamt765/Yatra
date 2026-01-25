import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  content: any[];
}

const BlogDetails = () => {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/blogData.json")
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        const found = data.find((post) => post.slug === slug);

        if (found) {
          setBlogPost(found);

          const related = data.filter(
            (post) =>
              post.category === found.category && post.slug !== found.slug
          );

          setRelatedPosts(related);
        }
      })
      .catch(console.error);
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="relative h-[42vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/90" />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("/placeholder.svg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Travel Stories & Guides
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Inspiring journeys, pilgrimage guides & expert tips by
            <span className="font-semibold"> Pashupatinath Holidays</span>
          </p>
        </div>
      </section>

      {/* ========== MOBILE BANNER (BELOW HERO) ========== */}
      <div className="lg:hidden px-4 mt-6">
        <img
          src="/assets/topbanner.png"
          alt="Pashupatinath Offer"
          className="w-full h-[140px] object-cover rounded-xl shadow-md"
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 py-14">
        {blogPost ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            {/* BLOG CONTENT */}
            <article>
              <h2 className="text-4xl font-bold mb-4">
                {blogPost.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge>{blogPost.category}</Badge>
                <span className="text-muted-foreground">{blogPost.date}</span>
                <span className="text-muted-foreground">
                  {blogPost.readTime}
                </span>
              </div>

              <img
                src={blogPost.coverImage}
                alt={blogPost.title}
                className="w-full h-[520px] object-cover rounded-2xl mb-8"
              />

              {blogPost.content.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <h3
                      key={index}
                      className="text-2xl font-bold mt-10 mb-4"
                    >
                      {block.value}
                    </h3>
                  );
                }

                if (block.type === "paragraph") {
                  return (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-muted-foreground mb-5"
                    >
                      {block.value}
                    </p>
                  );
                }

                if (block.type === "image") {
                  return (
                    <img
                      key={index}
                      src={block.src}
                      alt={block.alt}
                      className="w-full h-[420px] object-cover rounded-2xl my-8"
                    />
                  );
                }

                return null;
              })}
            </article>

            {/* DESKTOP SIDEBAR BANNER */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden shadow-xl animate-banner-drop">
                  <img
                    src="/assets/sidebanner-pashupatinath-holidays2.png"
                    alt="Pashupatinath Holidays Offers"
                    className="w-full h-[560px] object-cover"
                  />
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="text-center py-24 text-xl font-semibold">
            Loading...
          </div>
        )}

        {/* ================= RELATED BLOGS ================= */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h3 className="text-3xl font-bold mb-6">Related Blogs</h3>

            <div className="flex gap-6 overflow-x-auto pb-4">
              {relatedPosts.map((post) => (
                <Card
                  key={post.id}
                  className="min-w-[320px] hover:shadow-xl transition"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-44 object-cover rounded-t-2xl"
                  />

                  <CardContent>
                    <h4 className="font-bold text-lg mb-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {post.metaDescription}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-between items-center">
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="outline">Read More</Button>
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {post.readTime}
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;