import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}

const BlogDetails = () => {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch("/blogData.json")
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        const post = data.find((item) => item.slug === slug);
        setBlogPost(post || null);
      });
  }, [slug]);

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm">
          <ArrowLeft /> Back to Blog
        </Link>

        <h1 className="mt-6 text-4xl md:text-5xl font-playfair italic">
          {blogPost.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>{blogPost.date}</span>
          <span>{blogPost.author}</span>
          <span>{blogPost.readTime}</span>
          <span className="bg-primary/10 px-3 py-1 rounded-full">
            {blogPost.category}
          </span>
        </div>

        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="mt-8 w-full h-[450px] object-cover rounded-xl"
        />

        <Card className="mt-8 p-8">
          <div className="prose max-w-none">
            <p>{blogPost.content}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BlogDetails;