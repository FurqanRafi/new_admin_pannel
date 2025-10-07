"use client";

import { AuthContext } from "@/AppContext/AppContext";
import React, { useContext, useEffect, useState } from "react";

const Navbar = () => {
  const { createNavbar, getNavbar, addUpdateNavbar, deleteNavbar } =
    useContext(AuthContext);
  const [create, setCreate] = useState(false);
  const [popup, setPopup] = useState(false);
  const [formData, setFormData] = useState({
    logo: "",
    navlinks: [{ name: "", url: "" }],
    btntext: "",
    btnlink: "",
  });

  const [update, setUpdate] = useState(false);
  const [updateLogo, setUpdateLogo] = useState("");
  const [updateNavbar, setUpdateNavbar] = useState([{ name: "", url: "" }]);
  const [updateBtnText, setUpdateBtnText] = useState("");
  const [updateBtnLink, setUpdateBtnLink] = useState("");
  const [updateId, setUpdateid] = useState(null);

  useEffect(() => {
    handleUpdateClick();
  }, []);

  // Create navbar submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createNavbar(formData);
    if (res) {
      setCreate(false);
    }
    console.log(res);
  };

  // Load existing navbar for update
  const handleUpdateClick = async () => {
    const res = await getNavbar();
    console.log(res);
    setUpdateLogo(res?.logo);
    setUpdateNavbar(res?.navlinks);
    setUpdateBtnText(res?.btntext);
    setUpdateBtnLink(res?.btnlink);
  };

  const handleUpdate = async () => {
    try {
      const res = await addUpdateNavbar(
        {
          logo: updateLogo,
          navlinks: updateNavbar,
          btntext: updateBtnText,
          btnlink: updateBtnLink,
        },
        updateId
      );

      // Update ke baad fresh data fetch karo
      const updatedData = await getNavbar();
      setLogo(updatedData?.logo);
      setNavlinks(updatedData?.navlinks);
      setBtntext(updatedData?.btntext);
      setBtnlink(updatedData?.btnlink);
      setUpdate(false); // form close karna ho to
    } catch (error) {
      console.error("Error updating navbar:", error);
    }
  };

  // Load current navbar when component mounts
  const [logo, setLogo] = useState("");
  const [navlinks, setNavlinks] = useState([{ name: "", url: "" }]);
  const [btntext, setBtntext] = useState("");
  const [btnlink, setBtnlink] = useState("");

  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await getNavbar();
    console.log(data);
    setLogo(data?.logo);
    setNavlinks(data?.navlinks);
    setBtntext(data?.btntext);
    setBtnlink(data?.btnlink);
    setUpdateid(data?._id);
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, [create]);

  const handleDelete = async () => {
    try {
      const res = await deleteNavbar(updateId);
      if (res) {
        setUpdate(false);
        setFormData({
          logo: "",
          navlinks: [{ name: "", url: "" }],
          btntext: "",
          btnlink: "",
        });
        setPopup(false);
      }
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  // Helpers
  const addLink = () => {
    setFormData({
      ...formData,
      navlinks: [...formData.navlinks, { name: "", url: "" }],
    });
  };

  const removeLink = (index) => {
    const updatedLinks = formData.navlinks.filter((_, i) => i !== index);
    setFormData({ ...formData, navlinks: updatedLinks });
  };

  const updateLink = (index, field, value) => {
    const updatedLinks = [...formData.navlinks];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, navlinks: updatedLinks });
  };

  // Update form helpers
  const updateExistingLink = (index, field, value) => {
    const updatedLinks = [...updateNavbar];
    updatedLinks[index][field] = value;
    setUpdateNavbar(updatedLinks);
  };

  const removeUpdateLink = (index) => {
    const updatedLinks = updateNavbar.filter((_, i) => i !== index);
    setUpdateNavbar(updatedLinks);
  };

  const addUpdateLink = () => {
    setUpdateNavbar([...updateNavbar, { name: "", url: "" }]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-center backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#B75826] mx-auto"></div>
          <p className="mt-6 text-[#a15102] font-bold text-lg uppercase tracking-wide">
            Loading Navbar...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start py-10 gap-10 ">
      <div className="w-[95%] h-[95%] backdrop-blur-xl  border-[#F5EFEB]/[0.20] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-xl">
        <h1 className="text-3xl py-7 px-5 font-bold text-[#a15102]">
          Navbar Dashboard
        </h1>

        <div className="px-5 pb-7">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl text-[#a15102] font-semibold">
              Current Navbar
            </h2>
          </div>

          {/* Toggle Create Navbar Form */}
          <button
            onClick={() => {
              setCreate(!create);
              setUpdate(false);
            }}
            className="px-7 py-3 bg-[#B75826] text-white rounded-full mb-5"
            disabled={logo}
          >
            {create ? "Close Form" : "Create Navbar"}
          </button>

          {/* Create Form */}
          {create && (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-5 backdrop-blur-xl rounded-xl bg-[#FFEDE0]/[0.3] border-[#F5EFEB]/[0.20] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)] "
            >
              <div className="flex text-white flex-col gap-3">
                <label className="text-[#a15102] text-lg font-bold  ">
                  Logo URL
                </label>
                <input
                  type="text"
                  placeholder="Logo URL"
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  className="w-full p-2 border border-[#ffffff]/30 rounded-md"
                />
              </div>

              <div className="flex text-white flex-col gap-3">
                <label className="text-[#a15102] text-lg font-bold  ">
                  Navbar Links
                </label>
                {formData.navlinks.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Link Name"
                      value={link.name}
                      onChange={(e) =>
                        updateLink(index, "name", e.target.value)
                      }
                      className="flex-1 p-2  border border-[#ffffff]/30 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Link URL"
                      value={link.url}
                      onChange={(e) => updateLink(index, "url", e.target.value)}
                      className="flex-1 p-2  border border-[#ffffff]/30 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="px-3 py-1 bg-[#B75826] hover:bg-red-500 text-white rounded-md"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLink}
                  className="px-4 py-2 w-1/5 self-end bg-[#B75826] hover:bg-red-500 text-white rounded-md"
                >
                  Add Link
                </button>
              </div>

              <div className="flex text-white flex-col gap-3">
                <label className="text-[#a15102] text-lg font-bold">
                  Button Name
                </label>
                <input
                  type="text"
                  placeholder="Button Name"
                  value={formData.btntext}
                  onChange={(e) =>
                    setFormData({ ...formData, btntext: e.target.value })
                  }
                  className="w-full p-2  border border-[#ffffff]/30 rounded"
                />
              </div>

              <div className="flex  text-white flex-col gap-3">
                <label className="text-[#a15102] text-lg font-bold">
                  Button URL
                </label>
                <input
                  type="text"
                  placeholder="Button URL"
                  value={formData.btnlink}
                  onChange={(e) =>
                    setFormData({ ...formData, btnlink: e.target.value })
                  }
                  className="w-full p-2  border border-[#ffffff]/30 rounded"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-[#B75826] hover:bg-red-500  text-white rounded-md"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Update Form */}
      <div className="w-[95%] h-[95%] backdrop-blur-xl border border-[#F5EFEB]/[0.20] shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden">
        {update && (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 mt-10 p-5 w-[97%] mx-auto backdrop-blur-xl rounded-xl bg-[#FFEDE0]/[0.3] border-[#F5EFEB]/[0.20] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)]"
          >
            <div className="flex text-white flex-col gap-3">
              <label className="text-[#a15102] text-lg font-bold">
                Logo URL
              </label>
              <input
                type="text"
                placeholder="Logo URL"
                className="w-full p-2  border border-[#ffffff]/30 rounded-md"
                value={updateLogo || ""} // fallback empty string
                onChange={(e) => setUpdateLogo(e.target.value)}
              />
            </div>

            <div className="flex text-white flex-col gap-3">
              <label className="text-[#a15102] text-lg font-bold">
                Navbar Links
              </label>
              {updateNavbar?.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Link Name"
                    className="flex-1 p-2  border border-[#ffffff]/30 rounded-md"
                    value={link.name}
                    onChange={(e) =>
                      updateExistingLink(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Link URL"
                    className="flex-1 p-2  border border-[#ffffff]/30 rounded-md"
                    value={link.url}
                    onChange={(e) =>
                      updateExistingLink(index, "url", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeUpdateLink(index)}
                    className="px-3 py-1  bg-[#B75826] hover:bg-red-500 text-white rounded-md"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addUpdateLink}
                className="px-4 py-2 w-1/5 self-end bg-[#B75826] hover:bg-red-500 text-white rounded-md"
              >
                Add Link
              </button>
            </div>

            <div className="flex text-white flex-col gap-3">
              <label className="text-[#a15102] text-lg font-bold">
                Button Name
              </label>
              <input
                type="text"
                placeholder="Button Name"
                className="w-full p-2  border border-[#ffffff]/30 rounded"
                value={updateBtnText}
                onChange={(e) => setUpdateBtnText(e.target.value)}
              />
            </div>

            <div className="flex text-white flex-col gap-3">
              <label className="text-[#a15102] text-lg font-bold">
                Button URL
              </label>
              <input
                type="text"
                placeholder="Button URL"
                className="w-full p-2  border border-[#ffffff]/30 rounded"
                value={updateBtnLink}
                onChange={(e) => setUpdateBtnLink(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-[#B75826] hover:bg-red-500 text-white rounded-md"
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
        )}

        <div className="px-10 py-10 backdrop-blur-xl rounded-xl  border-[#F5EFEB]/[0.20] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)]">
          {/* Logo Section */}
          <div className="mb-8 flex justify-between items-start">
            <div className="flex-1">
              <div className="font-bold text-white text-xl uppercase tracking-wide mb-4 px-4">
                Logo
              </div>
              <div className="px-8 text-white py-20 w-1/4 border border-amber-100/40 rounded-lg bg-white/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                <img src={logo} alt={logo} className="w-full h-auto" />
              </div>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => {
                  setUpdate(!update);
                  if (!update) handleUpdateClick();
                  setCreate(false);
                }}
                className="px-7 py-3 bg-[#B75826] rounded-full text-white"
                disabled={!logo}
              >
                {update ? "Close Form" : "Update Navbar"}
              </button>
              <button
                onClick={() => setPopup(true)}
                className="px-7 py-2 bg-[#B75826] rounded-full text-white"
                disabled={!logo}
              >
                Delete
              </button>
            </div>
            {popup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/ backdrop-blur-lg z-50">
                <div className="bg-white rounded-xl shadow-lg p-8 w-100 text-center">
                  <h2 className="text-lg font-semibold text-[#242220] mb-4">
                    Are you sure you want to Delete?
                  </h2>
                  <div className="flex justify-around mt-4">
                    <button
                      onClick={handleDelete}
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
          </div>

          {/* Navigation Links */}
          <div className="mb-8">
            {navlinks?.length === 0 || !navlinks ? (
              <p className="text-center text-white/70 py-8">
                No links available.
              </p>
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4 px-4">
                  <div className="font-bold text-white text-xl uppercase tracking-wide">
                    Name
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {navlinks.map((link, index) => (
                    <div
                      key={index}
                      className="group p-5 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full group-hover:animate-pulse"></div>
                        <span className="text-[#a15102] font-semibold">
                          {link.name}
                        </span>
                      </div>
                      <div className="pl-5">
                        <span className="text-white text-sm truncate block">
                          {link.url}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Button Section */}
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-6 mb-4 px-4">
              <div className="font-bold text-white text-xl uppercase tracking-wide">
                Button Text
              </div>
              <div className="font-bold text-white text-xl uppercase tracking-wide">
                Button Link
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-white">
              <div className="p-5 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
                {btntext}
              </div>
              <div className="p-5 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
                {btnlink}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
