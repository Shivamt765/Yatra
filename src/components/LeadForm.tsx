import { useState, useEffect } from "react";

interface LeadFormProps {
  whatsappNumber?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({
  whatsappNumber = "9151491889",
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("Family & Group");

  // Show popup only once per user
  useEffect(() => {
    const hasVisited = localStorage.getItem("leadFormShown");
    if (!hasVisited) {
      setShowPopup(true);
      localStorage.setItem("leadFormShown", "true");
    }
  }, []);

  // Prevent background scroll
  useEffect(() => {
    if (showPopup) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showPopup]);

  const handleClose = () => setShowPopup(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !destination) {
      alert("Please fill all fields!");
      return;
    }

    const msg = `Hello, my name is ${name}. I am interested in ${category} packages to ${destination}. My contact number is ${phone}.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg p-6 rounded-3xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-orange-400 text-xl font-bold"
        >
          ✕
        </button>

        {/* Form Header */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Plan Your Dream Trip
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-xl border border-white/40 bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 rounded-xl border border-white/40 bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="p-3 rounded-xl border border-white/40 bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 rounded-xl border border-white/40 bg-white/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option>Family & Group</option>
            <option>Honeymoon</option>
            <option>Adventure</option>
          </select>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;