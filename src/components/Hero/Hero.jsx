"use client";

import { AuthContext } from "@/AppContext/AppContext";
import React, { useContext, useEffect, useState } from "react";

const Hero = () => {
  const { getHero, createHero, addUpdateHero, deleteHero } =
    useContext(AuthContext);

  const [heroData, setHeroData] = useState(null);
  const [fromData, setFormData] = useState({
    title: "",
    heading: "",
    description: "",
    btntext: "",
    btnlink: "",
    heroimg: "",
    sideimg: "",
  });

  const [heroId, setHeroId] = useState(null);
  const [popup, setPop] = useState(false);
  const [updateHero, setUpdateHero] = useState(false);

  const loadData = async () => {
    const res = await getHero();
    if (res) {
      setHeroData(res); // Current Hero ke liye
      setHeroId(res._id);
    } else {
      setHeroData(null);
      setHeroId(null);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (heroId) {
      await addUpdateHero(fromData, heroId);
      alert("Updated Data");
    } else {
      await createHero(fromData);
      alert("Created Data");
    }
    await loadData(); // fresh reload
    setUpdateHero(false);
  };

  const UpdateHandler = () => {
    if (heroData) {
      setFormData({
        title: heroData.title || "",
        heading: heroData.heading || "",
        description: heroData.description || "",
        btntext: heroData.btntext || "",
        btnlink: heroData.btnlink || "",
        heroimg: heroData.heroimg || "",
        sideimg: heroData.sideimg || "",
      });
    }
    setUpdateHero(true);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteHero(heroId);
      if (res) {
        setFormData({
          title: "",
          heading: "",
          description: "",
          btntext: "",
          btnlink: "",
          heroimg: "",
          sideimg: "",
        });
        setPop(false);
      }
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start py-10 justify-center ">
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/ backdrop-blur-lg z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-100 text-center">
            <h2 className="text-lg font-semibold text-[#242220] mb-4">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleDelete}
                className="bg-[#B75826] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#9c4519]"
              >
                Yes
              </button>
              <button
                onClick={() => setPop(false)}
                className="bg-gray-300 text-[#242220] px-4 py-2 rounded-lg font-medium hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-[95%] h-[95%] backdrop-blur-xl  border-[#ffffff]/[0.1] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-xl">
        {/* Header */}
        <h1 className="text-3xl py-7 px-5 font-bold text-[#242220]">
          Hero Section Dashboard
        </h1>

        <div className="px-5 pb-7">
          {/* Current Hero Section */}
          <div className="w-full h-[80%] rounded-2xl bg-transparent border-[#ffffff]/[0.1] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)] flex flex-col gap-10 p-10 mt-5">
            {heroData ? (
              <>
                {/* Header with Update/Delete buttons */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl text-[#242220] font-semibold">
                    Current Hero Section
                  </h2>
                  <div className="flex gap-5">
                    <button
                      className="px-7 py-2 bg-[#B75826] text-white rounded-full hover:bg-[#9c4519] transition-all"
                      onClick={UpdateHandler}
                    >
                      Update
                    </button>
                    <button
                      className="px-7 py-2 bg-[#B75826] text-white rounded-full hover:bg-red-600 transition-all"
                      onClick={() => setPop(true)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Display Hero Data */}

                <div className="flex flex-col md:flex-row gap-10 items-center backdrop-blur-xl rounded-xl  border-[#F5EFEB]/[0.20] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)]">
                  {/* Left - Text Content */}
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="mt-8">
                      <div className="font-bold text-xl uppercase tracking-wide">
                        Title
                      </div>
                      <div className="p-5 text-gray-700 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
                        {heroData.title}
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="font-bold text-xl uppercase tracking-wide">
                        Heading
                      </div>

                      <div className="p-5 text-gray-700 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
                        {heroData.heading}
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="font-bold text-xl uppercase tracking-wide">
                        Description
                      </div>
                      <div className="p-5 text-gray-700 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
                        {heroData.description}
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="grid grid-cols-2 gap-6 mb-4 px-4">
                        <div className="font-bold text-xl uppercase tracking-wide">
                          Button Text
                        </div>
                        <div className="font-bold text-xl uppercase tracking-wide">
                          Button Link
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-5 text-gray-700 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
                          {heroData.btntext}
                        </div>
                        <div className="p-5 text-gray-700 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
                          {heroData.btnlink}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Images */}
                  <div className="flex-col gap-5">
                    <div className="flex-1">
                      <div className="font-bold text-xl uppercase tracking-wide mb-2 px-4">
                        Hero Image
                      </div>
                      <div className="p-10  border border-amber-100/40 rounded-lg bg-white/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                        <img
                          src={heroData.heroimg}
                          alt="Logo"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-xl uppercase tracking-wide mb-2 mt-5 px-4">
                        Side Imag
                      </div>
                      <div className="p-10  border border-amber-100/40 rounded-lg bg-white/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                        <img
                          src={heroData.sideimg}
                          alt="Logo"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* No Data UI */}
                <h1 className="text-5xl text-[#242220] font-semibold">
                  No Hero Section
                </h1>
              </>
            )}
          </div>

          {/* Create Hero Section */}
          <div className="w-full h-[80%] mt-7 backdrop-blur-xl rounded-xl  border-[#F5EFEB]/[0.20] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)]">
            <h1 className="text-[#242220] text-2xl font-semibold">
              Create Hero Section
            </h1>
            <div className="w-full h-[80%] px-10 rounded-2xl bg-transparent border-[#ffffff]/[0.1] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)] mt-7">
              <form onSubmit={submitHandler} className="space-y-4">
                <div className="grid grid-cols-1 gap-5 py-10">
                  <div className="flex flex-col gap-3">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Enter title"
                      value={fromData.title ?? ""}
                      onChange={(e) => {
                        setFormData({ ...fromData, title: e.target.value });
                      }}
                      className="w-full p-2 border border-[#ffffff] rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label>Heading</label>
                    <input
                      type="text"
                      placeholder="Enter main heading"
                      value={fromData.heading ?? ""}
                      onChange={(e) => {
                        setFormData({ ...fromData, heading: e.target.value });
                      }}
                      className="w-full p-2 border border-[#ffffff] rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label>Description</label>
                    <input
                      type="text"
                      placeholder="Enter sub heading"
                      value={fromData.description ?? ""}
                      onChange={(e) => {
                        setFormData({
                          ...fromData,
                          description: e.target.value,
                        });
                      }}
                      className="w-full p-2 border border-[#ffffff] rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label>Button Text</label>
                    <input
                      type="text"
                      placeholder="Enter button text"
                      value={fromData.btntext ?? ""}
                      onChange={(e) => {
                        setFormData({ ...fromData, btntext: e.target.value });
                      }}
                      className="w-full p-2 border border-[#ffffff] rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label>Button Link</label>
                    <input
                      type="text"
                      placeholder="Enter button link"
                      value={fromData.btnlink ?? ""}
                      onChange={(e) => {
                        setFormData({ ...fromData, btnlink: e.target.value });
                      }}
                      className="w-full p-2 border border-[#ffffff] rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label>Hero Image URL</label>
                    <input
                      type="text"
                      placeholder="https://example.com/hero.jpg"
                      value={fromData.heroimg ?? ""}
                      onChange={(e) => {
                        setFormData({ ...fromData, heroimg: e.target.value });
                      }}
                      className="w-full p-2 border border-[#ffffff] rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label>Side Image URL</label>
                    <input
                      type="text"
                      placeholder="https://example.com/side.jpg"
                      value={fromData.sideimg ?? ""}
                      onChange={(e) => {
                        setFormData({ ...fromData, sideimg: e.target.value });
                      }}
                      className="w-full p-2 border border-[#ffffff] rounded-xl"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#B75826] hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-200"
                    >
                      {heroId ? "Update" : "Create"}
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-[#B75826] hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
