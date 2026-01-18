import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent, useRef } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Users,
  Hotel,
  Utensils,
  Camera,
  Activity,
  CheckCircle,
  XCircle,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabaseClient";
import SimilarPackages from "@/components/SimilarPackages";

/* ================= TYPES ================= */

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

interface Package {
  id: number;
  slug: string;
  title: string;
  description: string;
  location: string;
  price: string;
  duration: string;
  image: string;
  rating?: number;
  type?: "international" | "domestic";
  categories?: string[];
  gallery?: string[];
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
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

/* ================= GALLERY ================= */

const TripGallery = ({ gallery }: { gallery: string[] }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const interval = setInterval(() => {
      carousel.scrollLeft =
        carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth
          ? 0
          : carousel.scrollLeft + 1;
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-brand-orange">
        <Camera className="h-5 w-5" /> Trip Gallery
      </h3>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto no-scrollbar"
      >
        {gallery.map((img, i) => (
          <div
            key={i}
            className="w-60 h-40 flex-shrink-0 overflow-hidden rounded-xl shadow-md cursor-pointer"
            onClick={() => setSelectedImg(img)}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {selectedImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-4xl w-full px-4">
            <button
              className="absolute top-4 right-4 bg-white/30 p-2 rounded-full"
              onClick={() => setSelectedImg(null)}
            >
              <X className="text-white" />
            </button>
            <img
              src={selectedImg}
              alt=""
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const PackageDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState<Package | null>(null);
  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  /* ================= FETCH PACKAGE ================= */

  useEffect(() => {
    fetch("/packages.json")
      .then((res) => res.json())
      .then((data: Package[]) => {
        setAllPackages(data);
        const pkg = data.find((p) => p.slug === slug);
        setPackageData(pkg || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  /* ================= FORM ================= */

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    if (!formData.message.trim()) newErrors.message = "Message required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!packageData || !validateForm()) return;

    setIsSubmitting(true);

    await supabase.from("package_queries").insert([
      {
        package_name: packageData.title,
        ...formData,
      },
    ]);

    setIsSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitting(false);
      setIsSuccess(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 2000);
  };

  /* ================= STATES ================= */

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand-orange" />
      </div>
    );

  if (!packageData)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Package not found
      </div>
    );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* HERO */}
      <div className="relative h-[400px]">
        <img
          src={packageData.image}
          alt={packageData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <Button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/20 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{packageData.title}</h1>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {packageData.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {packageData.duration}
            </span>
            {packageData.rating && (
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400" />
                {packageData.rating}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-600">{packageData.description}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="itinerary">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary">
              {packageData.gallery && (
                <TripGallery gallery={packageData.gallery} />
              )}

              {packageData.itinerary?.map((day) => (
                <Card key={day.day} className="mb-4">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">
                      Day {day.day}: {day.title}
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {day.activities.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}

              {/* SIMILAR PACKAGES */}
              <SimilarPackages
                packages={allPackages}
                selectedPackage={packageData}
                onViewItinerary={(slug) =>
                  navigate(`/packages/${slug}`)
                }
                onSendQuery={() => setIsModalOpen(true)}
              />
            </TabsContent>

            <TabsContent value="inclusions">
              <Card>
                <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Included</h3>
                    {packageData.inclusions?.map((i, idx) => (
                      <p key={idx}>{i}</p>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Excluded</h3>
                    {packageData.exclusions?.map((i, idx) => (
                      <p key={idx}>{i}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="highlights">
              <Card>
                <CardContent className="p-6">
                  Premium stays • Local experiences • Expert guides
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* SIDEBAR */}
        <Card className="h-fit sticky top-6">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-600">Starting from</p>
            <p className="text-4xl font-bold text-brand-orange">
              {packageData.price}
            </p>
            <Button
              className="w-full mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              <MessageCircle className="mr-2 h-4 w-4" /> Send Enquiry
            </Button>
            <Separator className="my-6" />
            <a href="tel:+919151491889" className="block text-sm">
              <Phone className="inline h-4 w-4 mr-2" />
              +91 9151491889
            </a>
            <a href="mailto:pashupatinathholidays@gmail.com" className="block text-sm">
              <Mail className="inline h-4 w-4 mr-2" />
              pashupatinathholidays@gmail.com
            </a>
          </CardContent>
        </Card>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            {isSuccess ? (
              <p className="text-center text-green-600">
                Query Sent Successfully!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "email", "phone", "message"].map((field) => (
                  <input
                    key={field}
                    placeholder={field}
                    className="w-full border p-2 rounded"
                    value={(formData as any)[field]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field]: e.target.value,
                      })
                    }
                  />
                ))}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
