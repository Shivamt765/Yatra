import { useState, useEffect } from "react"

const fetchPackages = async () => {
  const res = await fetch("/packages.json")
  return res.json()
}

const Packages = () => {
  const [packages, setPackages] = useState([])
  const [query, setQuery] = useState("")
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    fetchPackages()
      .then((data) => {
        setPackages(data)
        setFiltered(data)
      })
      .catch((err) => console.error("Failed to fetch packages:", err))
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(packages)
    } else {
      const lower = query.toLowerCase()
      setFiltered(
        packages.filter(
          (p) =>
            p.title.toLowerCase().includes(lower) ||
            p.location.toLowerCase().includes(lower)
        )
      )
    }
  }, [query, packages])

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Explore Our Packages
          </h2>
          <p className="mt-3 text-lg text-white/70">
            Handpicked tours for every kind of traveler
          </p>
        </div>

        {/* Search Bar (Glass Effect) */}
        <div className="relative max-w-xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search by city or package..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-6 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute right-5 top-3 text-white/60">🔍</span>
        </div>

        {/* Packages Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-white/60">No packages found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white">
                    {pkg.title}
                  </h3>
                  <p className="text-white/70 mt-2">{pkg.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-white font-medium">
                      📍 {pkg.location}
                    </span>
                    <span className="text-white/80">{pkg.duration}</span>
                  </div>
                  <p className="text-xl font-bold text-yellow-400 mt-4">
                    {pkg.price}
                  </p>
                  <button className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Packages
