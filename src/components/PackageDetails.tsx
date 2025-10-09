// PackageDetails.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, FormEvent } from 'react';
import {
  ArrowLeft, MapPin, Clock, Star, Phone, Mail, MessageCircle,
  Users, Hotel, Utensils, Camera, Activity, CheckCircle, XCircle, X, Send, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabaseClient';

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface Package {
  id: number;
  title: string;
  description: string;
  location: string;
  price: string;
  duration: string;
  image: string;
  rating?: number;
  live?: boolean;
  categories?: string[];
  gallery?: string[];
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
}

const PackageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch package data
  useEffect(() => {
    fetch('/packages.json')
      .then(res => res.json())
      .then((data: Package[]) => {
        const pkg = data.find((p) => p.id.toString() === id);
        setPackageData(pkg || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  // Validate form fields
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form to Supabase & WhatsApp
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!packageData) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    const { error } = await supabase.from('package_queries').insert([{
      package_name: packageData.title,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    }]);

    if (error) {
      console.error("Supabase insert error:", error);
      setIsSubmitting(false);
      return;
    }

    const waMessage = encodeURIComponent(
      `Hello! I'm interested in "${packageData.title}". My details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/919151491889?text=${waMessage}`, "_blank");

    setIsSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      setIsSubmitting(false);
      setIsSuccess(false);
    }, 2000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange" /></div>;
  if (!packageData) return <div className="min-h-screen flex items-center justify-center">Package not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img src={packageData.image} alt={packageData.title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"/>
        <Button onClick={() => navigate(-1)} className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30">
          <ArrowLeft className="mr-2 h-4 w-4"/> Back
        </Button>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{packageData.title}</h1>
          <div className="flex items-center gap-4 text-white/90">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/> {packageData.location}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4"/> {packageData.duration}</span>
            {packageData.rating && <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400"/> {packageData.rating}</span>}
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-8 -mt-16 relative z-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Overview Card */}
          <Card className="mb-6 backdrop-blur-md bg-white/90 border-white/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed">{packageData.description}</p>
            </CardContent>
          </Card>

          {/* Tabs: Itinerary, Inclusions, Highlights */}
          <Tabs defaultValue="itinerary" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary">
              {/* Gallery */}
              {packageData.gallery && packageData.gallery.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-brand-orange">
                    <Camera className="h-5 w-5" /> Trip Gallery
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {packageData.gallery.map((img, i) => (
                      <div key={i} className="overflow-hidden rounded-xl shadow-md group relative">
                        <img src={img} alt={`Gallery image ${i + 1}`} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"/>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic itinerary */}
              <div className="space-y-4">
                {packageData.itinerary?.map(day => (
                  <Card key={day.day} className="backdrop-blur-md bg-white/90 border-white/50">
                    <CardContent className="p-6 flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold">{day.day}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3">{day.title}</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Activity className="h-4 w-4"/> Activities</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">{day.activities.map((a,i)=><li key={i}>{a}</li>)}</ul>
                          </div>
                          <div className="flex gap-6">
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Utensils className="h-4 w-4"/> Meals</p>
                              <div className="flex gap-2">{day.meals.map((meal,i)=><Badge key={i} variant="secondary">{meal}</Badge>)}</div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Hotel className="h-4 w-4"/> Stay</p>
                              <Badge variant="outline">{day.accommodation}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inclusions">
              <Card className="backdrop-blur-md bg-white/90 border-white/50">
                <CardContent className="p-6 grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700"><CheckCircle className="h-5 w-5"/> What's Included</h3>
                    <ul className="space-y-2">{packageData.inclusions?.map((i, idx)=>(
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5"/>
                        <span className="text-gray-600">{i}</span>
                      </li>
                    ))}</ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-700"><XCircle className="h-5 w-5"/> What's Not Included</h3>
                    <ul className="space-y-2">{packageData.exclusions?.map((i, idx)=>(
                      <li key={idx} className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5"/>
                        <span className="text-gray-600">{i}</span>
                      </li>
                    ))}</ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="highlights">
              <Card className="backdrop-blur-md bg-white/90 border-white/50">
                <CardContent className="p-6 grid md:grid-cols-2 gap-4">
                  {[Camera, Activity, Hotel, Utensils, Users, MapPin].map((icon, i) => {
                    const texts = [
                      "Scenic photo opportunities",
                      "Adventure activities included",
                      "Premium accommodation",
                      "Authentic local cuisine",
                      "Small group experience",
                      "Hidden gems exploration"
                    ];
                    const IconComponent = icon as any;
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-orange-50">
                        <IconComponent className="h-5 w-5 text-brand-orange"/>
                        <span className="text-gray-700">{texts[i]}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="sticky top-6 backdrop-blur-md bg-white/90 border-white/50">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Starting from</p>
              <p className="text-4xl font-bold text-brand-orange">{packageData.price}</p>
              <p className="text-sm text-gray-600 mb-4">per person</p>

              <Button variant="outline" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={()=>setIsModalOpen(true)}>
                <MessageCircle className="mr-2 h-4 w-4"/> Send Enquiry
              </Button>

              <Separator className="my-6"/>
              <div className="space-y-2">
                <a href="tel:+91 9151491889" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-orange"><Phone className="h-4 w-4"/> +91 9151491889</a>
                <a href="mailto:yatraholidayinfo@gmail.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-orange"><Mail className="h-4 w-4"/> yatraholidayinfo@gmail.com</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Send Query Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={()=>setIsModalOpen(false)}>
          <div className="relative w-full max-w-lg backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setIsModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X className="h-5 w-5 text-gray-500"/>
            </button>
            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600"/>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Query Sent!</h3>
                  <p className="text-gray-600">Thank you for your interest in {packageData.title}. We'll get back to you shortly.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-playfair italic text-gray-900 mb-4">Send Query</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {['name','email','phone','message'].map(field=>{
                      const type = field==='email'?'email':field==='phone'?'tel':'text';
                      const placeholder = field==='name'?'John Doe':field==='email'?'john@example.com':field==='phone'?'+91 9999999999':'Your message';
                      const isTextarea = field==='message';
                      return (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{field.charAt(0).toUpperCase()+field.slice(1)} <span className="text-red-500">*</span></label>
                          {isTextarea ? (
                            <textarea
                              rows={4}
                              value={formData[field as keyof FormData]}
                              onChange={e=>setFormData({...formData,[field]:e.target.value})}
                              className={`w-full px-4 py-2 rounded-lg border ${errors[field as keyof FormErrors]?'border-red-500':'border-gray-300'} focus:ring-2 focus:ring-[hsl(var(--brand-orange))] transition-colors resize-none`}
                              placeholder={placeholder}
                            />
                          ):(<input
                            type={type}
                            value={formData[field as keyof FormData]}
                            onChange={e=>setFormData({...formData,[field]:e.target.value})}
                            className={`w-full px-4 py-2 rounded-lg border ${errors[field as keyof FormErrors]?'border-red-500':'border-gray-300'} focus:ring-2 focus:ring-[hsl(var(--brand-orange))] transition-colors`}
                            placeholder={placeholder}
                          />)}
                          {errors[field as keyof FormErrors] && <p className="mt-1 text-sm text-red-500">{errors[field as keyof FormErrors]}</p>}
                        </div>
                      )
                    })}
                    <Button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2">
                      {isSubmitting && <Loader2 className="animate-spin h-4 w-4"/>} Send Query
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
