import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Phone,
  Mail,
  MessageCircle,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabaseClient";
import SimilarPackages from "@/components/SimilarPackages";

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );

  if (!packageData)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Package not found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="relative h-[420px]">
        <img
          src={packageData.image}
          alt={packageData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

        <Button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/20 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="absolute bottom-8 left-6 text-white max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-sans leading-tight">
            {packageData.title}
          </h1>
          <p className="mt-2 text-lg font-medium">
            {packageData.location} • {packageData.duration}
          </p>
          {packageData.rating && (
            <p className="mt-1 text-sm font-semibold text-yellow-400">
              ⭐ {packageData.rating} / 5
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6 bg-white shadow-none border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-3">
                Overview
              </h2>
              <p className="text-gray-700">{packageData.description}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="itinerary">
            <TabsList className="grid grid-cols-3 mb-6 bg-white border border-gray-200 rounded-lg">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary">
              {packageData.itinerary?.map((day) => (
                <Card key={day.day} className="mb-4 bg-white border border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">
                      Day {day.day}: {day.title}
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {day.activities.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}

              <SimilarPackages
                packages={allPackages}
                selectedPackage={packageData}
                onViewItinerary={(slug) => navigate(`/packages/${slug}`)}
                onSendQuery={() => setIsModalOpen(true)}
              />
            </TabsContent>

            <TabsContent value="inclusions">
              <Card className="bg-white border border-gray-200">
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
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  Premium stays • Local experiences • Expert guides
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="h-fit sticky top-6 bg-white border border-gray-200">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-600">Starting from</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">
              {packageData.price}
            </p>

            <Button
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <MessageCircle className="mr-2 h-4 w-4" /> Send Enquiry
            </Button>

            <Separator className="my-4" />

            <a href="tel:+919151491889" className="block text-sm text-gray-700">
              <Phone className="inline h-4 w-4 mr-2 text-orange-500" />
              +91 9151491889
            </a>
            <a
              href="mailto:pashupatinathholidays@gmail.com"
              className="block text-sm text-gray-700 mt-2"
            >
              <Mail className="inline h-4 w-4 mr-2 text-orange-500" />
              pashupatinathholidays@gmail.com
            </a>
          </CardContent>
        </Card>
      </div>

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