"use client";

import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const [data, setData] = useState({
    navbar: null,
    hero: null,
    about: null,
    popular: null,
    cards: null,
    footer: null,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [navbar, hero, about, popular, cards, footer] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/navbar`)
          .then((r) => r.json())
          .then((d) => (Array.isArray(d) ? d[0] : d)),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/hero`)
          .then((r) => r.json())
          .then((d) => (Array.isArray(d) ? d[0] : d)),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/about`)
          .then((r) => r.json())
          .then((d) => (Array.isArray(d) ? d[0] : d)),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/popular`)
          .then((r) => r.json())
          .then((d) => (Array.isArray(d) ? d[0] : d)),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/card`)
          .then((r) => r.json())
          .then((d) => (Array.isArray(d) ? d[0] : d)),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/footer`)
          .then((r) => r.json())
          .then((d) => (Array.isArray(d) ? d[0] : d)),
      ]);

      setData({ navbar, hero, about, popular, cards, footer });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: "overview", name: "Overview" },
    { id: "navbar", name: "Navbar" },
    { id: "hero", name: "Hero Section" },
    { id: "about", name: "About" },
    { id: "popular", name: "Popular" },
    { id: "cards", name: "Cards" },
    { id: "footer", name: "Footer" },
  ];

  const DataCard = ({ title, icon: status, count }) => (
    <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-6 hover:shadow-[0_8px_40px_rgba(183,88,38,0.15)] hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-[#242220] mt-2">{count}</p>
        </div>
        <div
          className={`p-4 rounded-xl backdrop-blur-md ${
            status === "active"
              ? "bg-gradient-to-br from-[#B75826]/20 to-amber-100/30"
              : "bg-gray-200/30"
          }`}
        ></div>
      </div>
      <div className="mt-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            status === "active"
              ? "bg-gradient-to-r from-[#B75826]/20 to-amber-100/30 text-[#B75826] border border-[#B75826]/20"
              : "bg-gray-200/40 text-gray-600 border border-gray-300/30"
          }`}
        >
          {status === "active" ? "✓ Active" : "✗ No Data"}
        </span>
      </div>
    </div>
  );

  // ✅ Improved DataSection with array/object handling
  const DataSection = ({ title, data, fields }) => (
    <div className="backdrop-blur-xl bg-white/35 border border-white/20 rounded-2xl shadow-[0_7px_30px_rgba(0,0,0,0.15)] p-8 mb-6">
      <h3 className="text-2xl font-bold text-[#242220] mb-6 flex items-center gap-3 uppercase tracking-wide">
        {title}
        {data && (
          <span className="text-xs bg-gradient-to-r from-[#B75826]/20 to-amber-100/30 text-[#B75826] px-3 py-1.5 rounded-full border border-[#B75826]/20">
            Active
          </span>
        )}
      </h3>

      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => {
            const value = data[field.key];

            return (
              <div
                key={field.key}
                className="backdrop-blur-md bg-gradient-to-r from-white/50 to-amber-50/30 rounded-xl p-5 border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300"
              >
                <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">
                  {field.label}
                </p>

                <div className="text-gray-700 break-words space-y-2">
                  {Array.isArray(value) ? (
                    value.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {value.map((item, index) => (
                          <li
                            key={index}
                            className="bg-white/40 rounded-md p-2 border border-gray-200/40"
                          >
                            {typeof item === "object" ? (
                              <div className="text-sm text-gray-800">
                                {Object.entries(item).map(([k, v]) => (
                                  <p key={k}>
                                    <strong>{k}:</strong> {String(v)}
                                  </p>
                                ))}
                              </div>
                            ) : (
                              <span>{item}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="italic text-gray-500">Empty array</span>
                    )
                  ) : typeof value === "object" && value !== null ? (
                    <pre className="text-sm bg-white/30 p-3 rounded-md border border-gray-200/40 overflow-x-auto">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : (
                    <span>{value || "Not set"}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 backdrop-blur-md bg-white/20 rounded-xl border border-white/30">
          <p className="text-gray-600 text-lg">
            No data available for this section
          </p>
        </div>
      )}
    </div>
  );

  const OverviewSection = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DataCard
          title="Navbar"
          status={data.navbar ? "active" : "inactive"}
          count={data.navbar ? "1" : "0"}
        />
        <DataCard
          title="Hero Section"
          status={data.hero ? "active" : "inactive"}
          count={data.hero ? "1" : "0"}
        />
        <DataCard
          title="About Section"
          status={data.about ? "active" : "inactive"}
          count={data.about ? "1" : "0"}
        />
        <DataCard
          title="Popular Section"
          status={data.popular ? "active" : "inactive"}
          count={data.popular ? "1" : "0"}
        />
        <DataCard
          title="Cards Section"
          status={data.cards ? "active" : "inactive"}
          count={data.cards ? "1" : "0"}
        />
        <DataCard
          title="Footer Section"
          status={data.footer ? "active" : "inactive"}
          count={data.footer ? "1" : "0"}
        />
      </div>

      <div className="backdrop-blur-xl bg-gradient-to-br from-[#B75826]/80 to-amber-600/70 border border-white/20 rounded-2xl shadow-[0_8px_40px_rgba(183,88,38,0.3)] p-10 text-white">
        <h2 className="text-3xl font-bold mb-3 uppercase tracking-wide">
          Welcome to Your Dashboard
        </h2>
        <p className="text-amber-50/90 mb-6 text-lg">
          Manage all your website sections from one place
        </p>
        <button
          onClick={fetchAllData}
          className="px-8 py-3 bg-white/95 backdrop-blur-md text-[#B75826] rounded-full font-semibold hover:bg-white hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-center backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#B75826] mx-auto"></div>
          <p className="mt-6 text-[#242220] font-bold text-lg uppercase tracking-wide">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-b border-white/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#242220] uppercase tracking-wide">
              Admin Dashboard
            </h1>
            <button
              onClick={fetchAllData}
              className="px-7 py-3 bg-gradient-to-r from-[#B75826] to-amber-600 text-white rounded-full hover:shadow-[0_8px_30px_rgba(183,88,38,0.4)] hover:scale-105 transition-all duration-300 text-sm font-semibold uppercase tracking-wide flex items-center gap-2"
            >
              Refresh All
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <nav className="backdrop-blur-xl bg-white/35 border border-white/20 rounded-2xl shadow-[0_7px_30px_rgba(0,0,0,0.1)] p-6 sticky top-28">
              <h2 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4 px-3">
                Sections
              </h2>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-[#B75826] to-amber-600 text-white shadow-[0_6px_25px_rgba(183,88,38,0.3)] scale-105"
                        : "text-gray-700 hover:bg-white/60 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] backdrop-blur-md"
                    }`}
                  >
                    <span className="uppercase tracking-wide text-sm">
                      {section.name}
                    </span>
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeSection === "overview" && <OverviewSection />}

            {activeSection === "navbar" && (
              <DataSection
                title="Navbar Data"
                data={data.navbar}
                fields={[
                  { key: "logo", label: "Logo" },
                  { key: "navlinks", label: "Navigation Links" },
                  { key: "btntext", label: "Button Text" },
                  { key: "btnlink", label: "Button Link" },
                ]}
              />
            )}

            {activeSection === "hero" && (
              <DataSection
                title="Hero Section Data"
                data={data.hero}
                fields={[
                  { key: "title", label: "Title" },
                  { key: "heading", label: "Heading" },
                  { key: "description", label: "Description" },
                  { key: "btntext", label: "Button Text" },
                  { key: "btnlink", label: "Button Link" },
                  { key: "heroimg", label: "Hero Image URL" },
                  { key: "sideimg", label: "Side Image URL" },
                ]}
              />
            )}

            {activeSection === "about" && (
              <DataSection
                title="About Section Data"
                data={data.about}
                fields={[
                  { key: "aboutimg", label: "Main Image" },
                  { key: "upperimg", label: "Upper Image" },
                  { key: "title", label: "Title" },
                  { key: "description", label: "Description" },
                  { key: "img1", label: "Image 1" },
                  { key: "img2", label: "Image 2" },
                  { key: "img3", label: "Image 3" },
                ]}
              />
            )}

            {activeSection === "popular" && (
              <DataSection
                title="Popular Section Data"
                data={data.popular}
                fields={[
                  { key: "title", label: "Title" },
                  { key: "description", label: "Description" },
                  { key: "topimg", label: "Top Image" },
                ]}
              />
            )}

            {activeSection === "cards" && (
              <DataSection
                title="Cards Section Data"
                data={data.cards}
                fields={[
                  { key: "Cardimg1", label: "Card Image 1" },
                  { key: "Cardimg2", label: "Card Image 2" },
                  { key: "Cardimg3", label: "Card Image 3" },
                  { key: "Cardimg4", label: "Card Image 4" },
                ]}
              />
            )}

            {activeSection === "footer" && (
              <DataSection
                title="Footer Data"
                data={data.footer}
                fields={[
                  { key: "logo", label: "Logo" },
                  { key: "description", label: "Description" },
                  { key: "address", label: "Address" },
                  { key: "mapEmbedUrl", label: "Map Embed URL" },
                  { key: "socaillinks", label: "Social Links" },
                  { key: "navlinks", label: "Navigation Links" },
                  { key: "quicklinks", label: "Quick Links" },
                  { key: "copyright", label: "Copyright" },
                ]}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
