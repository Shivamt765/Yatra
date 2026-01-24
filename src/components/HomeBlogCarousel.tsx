import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
}

export default function HomeBlog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/blogData.json")
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        setBlogPosts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const scrollTo = (direction: "next" | "prev") => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = carousel.clientWidth;
    const scrollAmount = direction === "next" ? cardWidth : -cardWidth;

    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Latest post is the last one in the array
  const latestPost = blogPosts[blogPosts.length - 1];

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-4xl md:text-5xl font-playfair italic text-gray-900">
            Travel Stories
          </h2>
          <p className="mt-2 text-gray-600 text-center">
            Explore Nepal, Mansarovar, Goa, Thailand, Kedarnath & Rajasthan
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => scrollTo("prev")}
            className="border p-2 rounded-full bg-white shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo("next")}
            className="border p-2 rounded-full bg-white shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* CAROUSEL */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-hidden snap-x snap-mandatory"
        >
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="min-w-[320px] max-w-[320px] snap-start overflow-hidden rounded-2xl"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-orange-500">
                    {post.category}
                  </span>

                  {/* SHOW RECENT BADGE ONLY FOR LATEST POST */}
                  {latestPost?.id === post.id && (
                    <span className="text-sm bg-green-500 text-white px-2 py-1 rounded-full">
                      Recent
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>

                {/* READ MORE LINK */}
                <Link to={`/blog/${post.slug}`} className="mt-4 inline-block">
                  <span className="text-primary font-semibold">
                    Read More →
                  </span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}