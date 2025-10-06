import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabaseClient'; // import supabase client

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

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [email, setEmail] = useState(''); // for newsletter input
  const [message, setMessage] = useState(''); // success/error message

  useEffect(() => {
    fetch('/blogData.json') // public folder file
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch((err) => console.error("Error loading blog data:", err));
  }, []);

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email");
      return;
    }

    const { data, error } = await supabase
      .from('newsletter')
      .insert([{ email }]);

    if (error) {
      console.error(error);
      setMessage("Failed to subscribe. Maybe already subscribed?");
    } else {
      setMessage("Subscribed successfully!");
      setEmail(''); // clear input
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/90" />
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("/placeholder.svg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Travel Stories & Guides</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Wanderlust Chronicles
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            Stories, tips, and inspiration from travelers around the globe
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-primary hover:bg-white">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground">
                  {post.excerpt}
                </p>
              </CardContent>
              
              <CardFooter className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {post.readTime}
                </span>
                <Button variant="ghost" className="group-hover:text-primary">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Adventure</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter and get the latest travel stories, tips, and exclusive deals delivered to your inbox.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button 
              size="lg" 
              className="whitespace-nowrap"
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          </div>
          {message && <p className="mt-4 text-sm text-primary">{message}</p>}
        </div>
      </section>
    </div>
  );
};

export default Blog;
