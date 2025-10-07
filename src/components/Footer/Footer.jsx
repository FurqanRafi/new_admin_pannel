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
    address: "", // 👈 add this
    mapEmbedUrl: "", // 👈 add this
  });

  const [footerId, setFooterId] = useState(null);
  const [popup, setPopup] = useState(false);
  const [updateFooter, setUpdateFooter] = useState(false);

  const loadData = async () => {
    try {
      const data = await getFooter();
      console.log("Get Footer Data", data);
      console.log(data);
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
      alert("Cards are Updated");
    } else {
      await createFooter(formData);
      alert("Created Data");
    }
    await loadData();
    setUpdateFooter(false);
  };

  // const updateHandler = async () => {
  //   if (footerData) {
  //     setFormData({
  //       logo: footerData.logo || "",
  //       description: footerData.description || "",
  //       copyright: footerData.copyright || "",
  //       socaillinks: footerData.socaillinks || [
  //         { plateform: "", icon: "", url: "" },
  //       ],
  //       navlinks: footerData.navlinks || [{ names: "", links: "" }],
  //       quicklinks: footerData.quicklinks || [{ name: "", link: "" }],
  //       address: footerData.address || "",
  //       mapEmbedUrl: footerData.mapEmbedUrl || "",
  //     });
  //   }
  //   setUpdateFooter(true);
  // };

  const updateClickButton = async () => {
    const res = await getFooter();
    console.log(res);
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
      alert("Footer is Deleted");
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

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socaillinks: [
        ...formData.socaillinks,
        { plateform: "", icon: "", url: "" },
      ],
    });
  };

  const removeSocialLink = (index) => {
    const updatedLinks = formData.socaillinks.filter((_, i) => i !== index);
    setFormData({ ...formData, socaillinks: updatedLinks });
  };

  const updateSocialLink = (index, field, value) => {
    const updatedLinks = [...formData.socaillinks];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, socaillinks: updatedLinks });
  };

  const addMenu = () => {
    setFormData({
      ...formData,
      navlinks: [...formData.navlinks, { names: "", links: "" }],
    });
  };

  const removeMenu = (index) => {
    const updatedLinks = formData.navlinks.filter((_, i) => i !== index);
    setFormData({ ...formData, navlinks: updatedLinks });
  };

  const updateMenu = (index, field, value) => {
    const updatedLinks = [...formData.navlinks];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, navlinks: updatedLinks });
  };

  const addService = () => {
    setFormData({
      ...formData,
      quicklinks: [...formData.quicklinks, { name: "", link: "" }],
    });
  };

  const removeService = (index) => {
    const updatedLinks = formData.quicklinks.filter((_, i) => i !== index);
    setFormData({ ...formData, quicklinks: updatedLinks });
  };

  const updateService = (index, field, value) => {
    const updatedLinks = [...formData.quicklinks];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, quicklinks: updatedLinks });
  };

  return (
    <div className="w-full min-h-screen flex items-start py-10 justify-center backdrop-blur-xl  border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)]">
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/ backdrop-blur-lg z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-100 text-center">
            <h2 className="text-lg font-semibold text-[#242220] mb-4">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-around mt-4">
              <button
                onClick={deleteHandler}
                className="bg-[#B75826] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#9c4519]"
              >
                Yes
              </button>
              <button
                onClick={() => setPopup(false)}
                className="bg-gray-300 text-[#242220] px-4 py-2 rounded-lg font-medium hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-[95%] h-auto backdrop-blur-xl  border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-xl">
        {/* Header */}
        <h1 className="text-3xl py-7 px-5 font-bold text-[#242220]">
          Footer Dashboard
        </h1>

        <div className="px-5 pb-7">
          {/* Top Action */}
          {footerData ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-white font-semibold">
                  Current Footer
                </h2>
                <div className="flex gap-5">
                  <button
                    onClick={updateClickButton}
                    className="px-7 py-2 bg-[#B75826] rounded-full text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setPopup(true)}
                    className="px-7 py-2 bg-[#B75826] rounded-full text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Display Footer */}

              <div className="w-full rounded-3xl backdrop-blur-xl border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] p-8 mt-5">
                <h2 className="text-3xl text-white font-bold mb-8 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                  Footer Configuration
                </h2>

                {/* Logo, Description & Copyright Section */}
                <div className="mb-8 p-8 rounded-2xl backdrop-blur-xl border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Logo - Left Side */}
                    <div className="lg:w-1/3 flex flex-col items-center justify-center">
                      <div className="w-full p-6 rounded-xl bg-gradient-to-br from-white/80 to-amber-50/60 border border-amber-300/40 shadow-inner">
                        <h3 className="font-semibold text-[#242220] mb-4 text-center text-lg">
                          Brand Logo
                        </h3>
                        <div className="flex justify-center items-center bg-white/40 rounded-lg p-4">
                          <img
                            src={footerData?.logo || ""}
                            alt={footerData?.logo || ""}
                            className="max-w-full h-28 text-gray-700 object-contain drop-shadow-md"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description & Copyright - Right Side */}
                    <div className="lg:w-2/3 flex flex-col gap-5">
                      {/* Description */}
                      <div className="p-6 rounded-xl bg-gradient-to-br from-white/70 to-amber-50/50 border border-amber-200/50 shadow-sm">
                        <h3 className="font-semibold text-[#242220] mb-3 text-lg flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Description
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {footerData?.description || "N/A"}
                        </p>
                      </div>

                      {/* Copyright */}
                      <div className="p-6 rounded-xl bg-gradient-to-br from-white/70 to-amber-50/50 border border-amber-200/50 shadow-sm">
                        <h3 className="font-semibold text-[#242220] mb-3 text-lg flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Copyright
                        </h3>
                        <p className="text-gray-700">
                          &copy; {footerData?.copyright || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address & Map Section */}
                <div className="mb-8 p-8 rounded-2xl backdrop-blur-xl  border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
                  <h3 className="font-bold text-white mb-6 text-2xl flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></span>
                    Location Information
                  </h3>

                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Address */}
                    <div className="lg:w-1/2 p-6 rounded-xl bg-gradient-to-br from-white/70 to-amber-50/50 border border-amber-200/50 shadow-sm">
                      <h4 className="font-semibold text-[#242220] mb-3 text-lg flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Address
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {footerData?.address || "N/A"}
                      </p>
                    </div>

                    {/* Map Embed */}
                    <div className="lg:w-1/2 p-6 rounded-xl bg-gradient-to-br from-white/70 to-amber-50/50 border border-amber-200/50 shadow-sm">
                      <h4 className="font-semibold text-[#242220] mb-3 text-lg flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Map Location
                      </h4>
                      {footerData?.mapEmbedUrl ? (
                        <div className="w-full h-48 rounded-lg overflow-hidden bg-white/40">
                          <iframe
                            src={footerData.mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Location Map"
                          ></iframe>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No map URL provided
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Links Section */}
                <div className="mb-8 p-8 rounded-2xl backdrop-blur-xl  border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
                  <h3 className="font-bold text-white mb-6 text-2xl flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></span>
                    Social Media Links
                  </h3>
                  <div className="space-y-3">
                    {footerData?.socaillinks?.map((social, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-xl bg-gradient-to-r from-white/80 via-amber-50/40 to-white/80 backdrop-blur-sm border border-amber-200/50 hover:border-amber-300 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-6">
                          {/* Icon */}
                          {social.icon && (
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/80 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                              <img
                                src={social.icon}
                                alt={social.plateform}
                                className="w-8 h-8 object-contain"
                              />
                            </div>
                          )}

                          {/* Platform Name */}
                          <div className="flex-shrink-0 min-w-[120px]">
                            <p className="font-semibold text-gray-800 text-base">
                              {social.plateform || "N/A"}
                            </p>
                          </div>

                          {/* URL */}
                          <div className="flex-1 min-w-0">
                            <a
                              href={social.url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-700 hover:underline truncate block font-medium"
                            >
                              {social.url || "N/A"}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Links Section */}
                <div className="mb-8 p-8 rounded-2xl backdrop-blur-xl  border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
                  <h3 className="font-bold text-white mb-6 text-2xl flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></span>
                    Navigation Links
                  </h3>
                  <div className="space-y-3">
                    {footerData?.navlinks?.map((nav, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-xl bg-gradient-to-r from-white/80 via-amber-50/40 to-white/80 backdrop-blur-sm border border-amber-200/50 hover:border-amber-300 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-6">
                          {/* Link Name */}
                          <div className="flex-shrink-0 min-w-[150px]">
                            <p className="font-semibold text-gray-800 text-base">
                              {nav.names || "N/A"}
                            </p>
                          </div>

                          {/* URL */}
                          <div className="flex-1 min-w-0">
                            <a
                              href={nav.links || "#"}
                              className="text-sm text-blue-600 hover:text-blue-700 hover:underline truncate block font-medium"
                            >
                              {nav.links || "N/A"}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Links Section */}
                <div className="p-8 rounded-2xl backdrop-blur-xl  border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
                  <h3 className="font-bold text-white mb-6 text-2xl flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></span>
                    Quick Links
                  </h3>
                  <div className="space-y-3">
                    {footerData?.quicklinks?.map((quick, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-xl bg-gradient-to-r from-white/80 via-amber-50/40 to-white/80 backdrop-blur-sm border border-amber-200/50 hover:border-amber-300 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-6">
                          {/* Link Name */}
                          <div className="flex-shrink-0 min-w-[150px]">
                            <p className="font-semibold text-gray-800 text-base">
                              {quick.name || "N/A"}
                            </p>
                          </div>

                          {/* URL */}
                          <div className="flex-1 min-w-0">
                            <a
                              href={quick.link || "#"}
                              className="text-sm text-blue-600 hover:text-blue-700 hover:underline truncate block font-medium"
                            >
                              {quick.link || "N/A"}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* No Footer Message */}
              <div className="w-full rounded-2xl border border-[#ffffff]/[0.1] shadow-[0_7px_30px_rgba(0,0,0,0.3)] flex flex-col items-center gap-10 p-20 mt-5">
                <h1 className="text-5xl text-[#242220] font-semibold">
                  No Footer Section
                </h1>
              </div>
            </>
          )}

          {/* Create Footer Form */}
          <div className="w-full mt-7">
            <h1 className="text-white text-2xl font-semibold">Create Footer</h1>
            <div className="w-full px-10 rounded-2xl text-white bg-transparent border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] mt-7">
              <form onSubmit={submitHandler} className="space-y-6 py-10">
                {/* Logo */}
                <div className="flex flex-col gap-3">
                  <label className="font-medium">Logo URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/logo.png"
                    value={formData.logo ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, logo: e.target.value })
                    }
                    className="w-full p-3 border border-[#ffffff]/30 rounded-xl"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-3">
                  <label className="font-medium">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Write footer description..."
                    value={formData.description ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-3 border border-[#ffffff]/30 rounded-xl"
                  ></textarea>
                </div>

                {/* Social Links */}
                <div className="flex flex-col gap-3">
                  <label className="font-medium">Social Links</label>
                  {formData.socaillinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="plateform"
                        value={link.plateform ?? ""}
                        onChange={(e) =>
                          updateSocialLink(index, "plateform", e.target.value)
                        }
                        className="w-1/4 p-2 border border-[#ffffff]/30 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Icon"
                        value={link.icon ?? ""}
                        onChange={(e) =>
                          updateSocialLink(index, "icon", e.target.value)
                        }
                        className="w-1/4 p-2 border border-[#ffffff]/30 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={link.url ?? ""}
                        onChange={(e) =>
                          updateSocialLink(index, "url", e.target.value)
                        }
                        className="w-full p-2 border border-[#ffffff]/30 rounded-xl"
                      />
                      <button
                        className="px-3 py-1 bg-[#B75826] hover:bg-red-700 text-white rounded-full"
                        type="button"
                        onClick={() => removeSocialLink(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    className="px-4 py-3 w-1/4 self-end bg-[#B75826] hover:bg-red-700 text-white rounded-md"
                    type="button"
                    onClick={addSocialLink}
                  >
                    + Add Link
                  </button>
                </div>

                {/* Menu */}
                <div className="flex flex-col gap-3">
                  <label className="font-medium">Menu Items</label>
                  {formData.navlinks.map((menu, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Name"
                        value={menu.names}
                        onChange={(e) =>
                          updateMenu(index, "names", e.target.value)
                        }
                        className="w-full p-2 border border-[#ffffff]/30 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Link"
                        value={menu.links}
                        onChange={(e) =>
                          updateMenu(index, "links", e.target.value)
                        }
                        className="w-full p-2 border border-[#ffffff]/30 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeMenu(index)}
                        className="px-3 py-1 bg-[#B75826] hover:bg-red-700 text-white rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMenu}
                    className="px-4 py-3 w-1/4 self-end bg-[#B75826] hover:bg-red-700 text-white rounded-md"
                  >
                    Add Item
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="font-medium">Services</label>
                  {formData.quicklinks.map((service, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Name"
                        value={service.name}
                        onChange={(e) =>
                          updateService(index, "name", e.target.value)
                        }
                        className="w-1/3 p-2 border border-[#ffffff]/30 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Link"
                        value={service.link}
                        onChange={(e) =>
                          updateService(index, "link", e.target.value)
                        }
                        className="w-full p-2 border border-[#ffffff]/30 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="px-3 py-1 bg-[#B75826] hover:bg-red-700 text-white rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addService}
                    className="px-4 py-3 w-1/4 self-end bg-[#B75826] hover:bg-red-700 text-white rounded-md"
                  >
                    Add Service
                  </button>
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-3">
                    <label className="font-medium">Address</label>
                    <input
                      type="text"
                      placeholder="Street, City"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full p-3 border border-[#ffffff]/30 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="font-medium">Map Embed URL</label>
                    <input
                      type="text"
                      placeholder="https://google.com/maps..."
                      value={formData.mapEmbedUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mapEmbedUrl: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-[#ffffff]/30 rounded-xl"
                    />
                  </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col gap-3">
                  <label className="font-medium">Copyright</label>
                  <input
                    type="text"
                    placeholder="© 2025 Your Company"
                    value={formData.copyright}
                    onChange={(e) =>
                      setFormData({ ...formData, copyright: e.target.value })
                    }
                    className="w-full p-3 border border-[#ffffff]/30 rounded-xl"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#B75826] hover:bg-red-700 text-white rounded-md font-medium"
                  >
                    {footerId ? "Update Footer" : "Create Footer"}
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-[#B75826] hover:bg-red-700 text-white rounded-md font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
