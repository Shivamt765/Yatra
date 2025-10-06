import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

const HomeBlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/blogData.json")
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        // Sort by date descending
        const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setBlogPosts(sorted.slice(0, 3)); // Only take latest 3 posts
      })
      .catch((err) => console.error("Error loading blog data:", err));
  }, []);

  if (!blogPosts.length) return null; // Or a loader

  return (
    <section className="py-20 bg-gradient-to-b from-background to-snow-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 font-playfair italic">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Latest Travel Stories
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Insights, tips, and wanderlust inspiration
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group relative cursor-pointer shadow-soft hover:shadow-lg transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-primary">{post.category}</Badge>
                </div>
              </div>

              <CardHeader>
                <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.date} · {post.author}</p>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>

              <CardFooter>
                <Link
                  to={`/blog/${post.id}`}
                  className="flex items-center text-primary hover:underline"
                >
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link to="/blog">
            <Button size="lg" className="px-8 py-3 rounded-full">
              View All Blogs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
