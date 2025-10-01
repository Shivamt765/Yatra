import { ShieldCheck, Globe, Heart } from "lucide-react";

const reasons = [
  {
    id: 1,
    title: "Trusted Expertise",
    description:
      "Decades of experience crafting journeys that transform. Your dreams, in expert hands.",
    icon: <ShieldCheck className="w-8 h-8 text-gray-900" />,
  },
  {
    id: 2,
    title: "Global Connections",
    description:
      "Access hidden gems worldwide, with insider tips and local partnerships.",
    icon: <Globe className="w-8 h-8 text-gray-900" />,
  },
  {
    id: 3,
    title: "Passion for Travel",
    description:
      "We don’t just plan trips — we create stories. Your adventure begins here.",
    icon: <Heart className="w-8 h-8 text-gray-900" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-28">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-playfair italic text-gray-900">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-700 font-poppins">
            Carefully woven journeys backed by trust, connection, and passion.
          </p>
        </div>

        {/* Thread + Cards */}
        <div className="relative flex flex-col md:flex-row md:justify-between md:items-start space-y-20 md:space-y-0 md:space-x-12">
          {/* Vertical dotted line as thread (only for desktop) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 border-l-2 border-dotted border-gray-400 z-0" />

          {reasons.map((reason, index) => (
            <div key={reason.id} className="relative z-10 flex flex-col items-center text-center md:text-left md:items-start md:w-1/3">
              {/* Knot circle */}
              <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-700 mb-6 md:mb-0 md:ml-[-12px] md:mb-4 z-10" />

              {/* Card */}
              <div className="bg-white rounded-2xl p-8 md:p-6 border border-gray-300 shadow-sm w-full">
                <div className="mb-4">{reason.icon}</div>
                <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-700 font-poppins text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
