import { useEffect, useState } from "react";

const POPUP_INTERVAL = 3 * 60 * 1000; // 3 minutes in ms

const LeadForm = ({ whatsappNumber = "9151491889" }) => {
  const [showPopup, setShowPopup] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("Family & Group");

  useEffect(() => {
    const lastShown = localStorage.getItem("leadPopupLastShown");
    const now = Date.now();

    if (!lastShown || now - Number(lastShown) > POPUP_INTERVAL) {
      setShowPopup(true);
      localStorage.setItem("leadPopupLastShown", now.toString());
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "auto";
  }, [showPopup]);

  const closePopup = () => setShowPopup(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !destination) {
      alert("Please fill all fields");
      return;
    }

    const message = `Hello,
Name: ${name}
Phone: ${phone}
Destination: ${destination}
Type: ${category}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-xl rounded-3xl p-8 backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl">
        {/* Close */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-white text-xl hover:text-orange-400"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Let’s Plan Your Trip ✈️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded-xl px-4 py-3 bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full rounded-xl px-4 py-3 bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="w-full rounded-xl px-4 py-3 bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl px-4 py-3 bg-white/30 text-white outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option>Family & Group</option>
            <option>Honeymoon</option>
            <option>Adventure</option>
            <option>Solo</option>
          </select>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 transition"
          >
            Send on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;