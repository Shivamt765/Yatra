import { useEffect, useState } from 'react';

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

const HomeBlogCarousel = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/blogData.json')
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch((err) => console.error('Error loading blog posts:', err));
  }, []);

  return (
    <div className="carousel">
      {blogPosts.slice(0, 3).map((post) => (
        <div key={post.id} className="carousel-item">
          <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
          <h3 className="text-lg font-bold mt-2">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.excerpt}</p>
          <a href="/Blog" className="text-primary mt-2 inline-block">
            View More
          </a>
        </div>
      ))}
    </div>
  );
};

export default HomeBlogCarousel;
