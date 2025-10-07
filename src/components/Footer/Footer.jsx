"use client";

import { AuthContext } from "@/AppContext/AppContext";
import React, { useContext, useEffect, useState } from "react";

const Footer = () => {
  const { getFooter, createFooter, addUpdateFooter, deleteFooter } =
    useContext(AuthContext);

  const [footerData, setFooterData] = useState(false);
  const [formData, setFormData] = useState({
    logo: "",
    description: "",
    copyright: "",
    socaillinks: [{ plateform: "", icon: "", url: "" }],
    navlinks: [{ names: "", links: "" }],
    quicklinks: [{ name: "", link: "" }],
    address: "",
    mapEmbedUrl: "",
  });

  const [footerId, setFooterId] = useState(null);
  const [popup, setPopup] = useState(false);

  const loadData = async () => {
    try {
      const data = await getFooter();
      if (data) {
        setFooterData(data);
        setFooterId(data._id);
      } else {
        setFooterData(null);
        setFooterId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (footerId) {
      await addUpdateFooter(formData, footerId);
      alert("Footer updated successfully!");
    } else {
      await createFooter(formData);
      alert("Footer created successfully!");
    }
    await loadData();
  };

  const updateClickButton = async () => {
    const res = await getFooter();
    if (res) {
      setFormData({
        logo: res.logo ?? "",
        description: res.description ?? "",
        copyright: res.copyright ?? "",
        socaillinks: res.socaillinks?.length
          ? res.socaillinks
          : [{ plateform: "", icon: "", url: "" }],
        navlinks: res.navlinks?.length
          ? res.navlinks
          : [{ names: "", links: "" }],
        quicklinks: res.quicklinks?.length
          ? res.quicklinks
          : [{ name: "", link: "" }],
        address: res.address ?? "",
        mapEmbedUrl: res.mapEmbedUrl ?? "",
      });
      setFooterId(res._id);
    }
  };

  const deleteHandler = async () => {
    if (footerId) {
      await deleteFooter(footerId);
      alert("Footer deleted successfully!");
      setFormData({
        logo: "",
        description: "",
        copyright: "",
        socaillinks: [{ plateform: "", icon: "", url: "" }],
        navlinks: [{ names: "", links: "" }],
        quicklinks: [{ name: "", link: "" }],
        address: "",
        mapEmbedUrl: "",
      });
    }
    loadData();
    setPopup(false);
  };

  const addSocialLink = () =>
    setFormData({
      ...formData,
      socaillinks: [
        ...formData.socaillinks,
        { plateform: "", icon: "", url: "" },
      ],
    });

  const removeSocialLink = (index) => {
    const updated = formData.socaillinks.filter((_, i) => i !== index);
    setFormData({ ...formData, socaillinks: updated });
  };

  const updateSocialLink = (index, field, value) => {
    const updated = [...formData.socaillinks];
    updated[index][field] = value;
    setFormData({ ...formData, socaillinks: updated });
  };

  const addMenu = () =>
    setFormData({
      ...formData,
      navlinks: [...formData.navlinks, { names: "", links: "" }],
    });

  const removeMenu = (index) => {
    const updated = formData.navlinks.filter((_, i) => i !== index);
    setFormData({ ...formData, navlinks: updated });
  };

  const updateMenu = (index, field, value) => {
    const updated = [...formData.navlinks];
    updated[index][field] = value;
    setFormData({ ...formData, navlinks: updated });
  };

  const addService = () =>
    setFormData({
      ...formData,
      quicklinks: [...formData.quicklinks, { name: "", link: "" }],
    });

  const removeService = (index) => {
    const updated = formData.quicklinks.filter((_, i) => i !== index);
    setFormData({ ...formData, quicklinks: updated });
  };

  const updateService = (index, field, value) => {
    const updated = [...formData.quicklinks];
    updated[index][field] = value;
    setFormData({ ...formData, quicklinks: updated });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-10 bg-gradient-to-b from-amber-50/30 to-orange-50/20 backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.3)] rounded-3xl">
      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-96 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Delete Footer?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this footer section?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={deleteHandler}
                className="px-5 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold shadow hover:opacity-90"
              >
                Yes
              </button>
              <button
                onClick={() => setPopup(false)}
                className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-[95%] max-w-6xl p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
            Footer Dashboard
          </h1>

          {footerData && (
            <div className="flex gap-4">
              <button
                onClick={updateClickButton}
                className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-amber-600 to-orange-600 shadow-md hover:scale-[1.03] transition"
              >
                Update
              </button>
              <button
                onClick={() => setPopup(true)}
                className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-600 to-orange-600 shadow-md hover:scale-[1.03] transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Display Footer Data */}
        {footerData ? (
          <div className="space-y-8">
            {/* Logo + Description */}
            <div className="p-8 rounded-2xl bg-white/20 border border-white/10 backdrop-blur-lg shadow-inner">
              <h2 className="text-2xl font-bold text-amber-700 mb-4">
                Brand Details
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={footerData.logo}
                  alt="Logo"
                  className="w-32 h-32 object-contain bg-white/50 rounded-xl shadow"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-gray-800">{footerData.description}</p>
                  <p className="text-gray-700 mt-2 italic">
                    {footerData.copyright}
                  </p>
                </div>
              </div>
            </div>

            {/* Address + Map */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/20 border border-white/10 backdrop-blur-lg shadow-inner">
                <h3 className="text-xl font-semibold text-amber-700 mb-2">
                  Address
                </h3>
                <p className="text-gray-800">{footerData.address}</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/20 border border-white/10 backdrop-blur-lg shadow-inner">
                <h3 className="text-xl font-semibold text-amber-700 mb-2">
                  Map Location
                </h3>
                {footerData.mapEmbedUrl ? (
                  <iframe
                    src={footerData.mapEmbedUrl}
                    className="w-full h-52 rounded-lg"
                    style={{ border: 0 }}
                    loading="lazy"
                  ></iframe>
                ) : (
                  <p className="text-gray-500 italic">No Map Added</p>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="p-8 rounded-2xl bg-white/20 border border-white/10 backdrop-blur-lg shadow-inner">
              <h2 className="text-2xl font-bold text-amber-700 mb-4">
                Social Media Links
              </h2>
              <div className="space-y-3">
                {footerData.socaillinks.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/40 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.icon}
                        alt={item.plateform}
                        className="w-8 h-8"
                      />
                      <p className="font-medium text-gray-800">
                        {item.plateform}
                      </p>
                    </div>
                    <a
                      href={item.url}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full text-center py-16 bg-white/10 border border-white/10 rounded-2xl backdrop-blur-md shadow-inner">
            <h2 className="text-3xl font-semibold text-gray-700">
              No Footer Data Found
            </h2>
          </div>
        )}

        {/* Create / Update Form */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-6">
            {footerId ? "Update Footer" : "Create Footer"}
          </h2>
          <form
            onSubmit={submitHandler}
            className="space-y-6 p-8 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-lg shadow-inner"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Logo URL
                </label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-white/20 bg-white/40 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Copyright
                </label>
                <input
                  type="text"
                  value={formData.copyright}
                  onChange={(e) =>
                    setFormData({ ...formData, copyright: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-white/20 bg-white/40 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="3"
                className="w-full p-3 rounded-xl border border-white/20 bg-white/40 focus:ring-2 focus:ring-amber-500 outline-none"
              ></textarea>
            </div>

            {/* Address + Map */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-white/20 bg-white/40 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Map Embed URL
                </label>
                <input
                  type="text"
                  value={formData.mapEmbedUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, mapEmbedUrl: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-white/20 bg-white/40 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-amber-600 to-orange-600 shadow-md hover:scale-[1.03] transition"
              >
                {footerId ? "Update Footer" : "Create Footer"}
              </button>
              <button
                type="reset"
                className="px-6 py-3 rounded-xl text-gray-700 bg-white/40 border border-white/20 hover:bg-white/60 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
