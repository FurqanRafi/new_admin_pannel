"use client";
import { AuthContext } from "@/AppContext/AppContext";
import React, { useContext, useEffect, useState } from "react";

const Popular = () => {
  const { getPopular, createPopular, addUpdatePopular, deletePopular } =
    useContext(AuthContext);

  const [popularData, setPopularData] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topimg: "",
  });

  const [popularId, setPopularId] = useState(null);
  const [popup, setPopup] = useState(false);
  const [updatePopular, setUpdatePopular] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await getPopular();
    console.log(res, "get popular");
    if (res) {
      setPopularData(res);
      console.log(res._id, "asdasd");
      setPopularId(res._id);
    } else {
      setPopularData(false);
      setPopularId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (popularId) {
      await addUpdatePopular(formData, popularId);
    } else {
      await createPopular(formData);
    }
    await loadData();
    setUpdatePopular(false);
  };

  const updateHandler = async () => {
    if (popularData) {
      setFormData({
        title: popularData?.title || "",
        description: popularData?.description || "",
        topimg: popularData?.topimg || "",
      });
    }
    setUpdatePopular(true);
  };

  const deleteHandler = async () => {
    try {
      console.log(popularId, "asdasd");
      const res = await deletePopular(popularId);
      if (res) {
        setFormData({
          title: "",
          description: "",
          topimg: "",
        });
        setPopup(false);
      }
      await loadData();
    } catch (error) {
      console.error("Error in Delting Data", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-center backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#B75826] mx-auto"></div>
          <p className="mt-6 text-[#242220] font-bold text-lg uppercase tracking-wide">
            Loading Popular...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-start py-10 justify-center  backdrop-blur-xl rounded-xl  border-[#F5EFEB]/[0.20] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)]">
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
      <div className="w-[95%] h-[95%]  rounded-xl p-6">
        {/* Header */}

        <h1 className="text-3xl font-bold text-white mb-2">
          Popular Section Dashboard
        </h1>
        <p className="text-white/70 mb-6">
          Manage your popular section content
        </p>

        {/* Current Popular Section */}
        <div className="rounded-2xl bg-transparent border border-[#ffffff]/[0.1] shadow-[0_7px_30px_rgba(0,0,0,0.3)] p-6 mb-8">
          {popularData ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl text-white font-semibold">
                  Current Popular Section
                </h2>
                <div className="flex gap-4">
                  <button
                    className="px-7 py-2 bg-[#B75826] text-white rounded-full hover:bg-[#9c4519] transition-all"
                    onClick={updateHandler}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setPopup(true)}
                    className="px-6 py-2 bg-[#B75826] rounded-full text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80">
                      Popular Heading
                    </label>
                    <p className="text-white bg-[#ffffff]/[0.3] p-3 rounded-xl mt-1">
                      {popularData.title}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80">
                      Popular Paragraph
                    </label>
                    <p className="text-white bg-[#ffffff]/[0.3] p-3 rounded-xl mt-1 leading-relaxed">
                      {popularData.description}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80">
                    Popular Image
                  </label>
                  <div className="mt-1 bg-[#ffffff]/[0.3] p-3 rounded-xl">
                    <img
                      src={popularData.topimg}
                      alt={popularData.topimg}
                      className="w-full max-w-xs px-10 py-10 text-white rounded-xl border border-[#ffffff]/[0.2]"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl text-white font-semibold">
                No Popular Section
              </h1>
            </>
          )}
        </div>

        {/* Create New Popular Section */}
        <div className="rounded-2xl bg-transparent border border-[#ffffff]/[0.1] shadow-[0_7px_30px_rgba(0,0,0,0.3)] p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            Create New Popular Section
          </h3>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Popular Heading
                </label>
                <input
                  type="text"
                  placeholder="Enter popular heading"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                  className="w-full px-4 py-2 bg-[#ffffff]/[0.3] border border-[#ffffff]/[0.2] rounded-xl text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Popular Image URL
                </label>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={formData.topimg}
                  onChange={(e) => {
                    setFormData({ ...formData, topimg: e.target.value });
                  }}
                  className="w-full px-4 py-2 bg-[#ffffff]/[0.3] border border-[#ffffff]/[0.2] rounded-xl text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Popular Paragraph
              </label>
              <textarea
                rows={4}
                placeholder="Enter popular paragraph"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
                className="w-full px-4 py-2 bg-[#ffffff]/[0.3] border border-[#ffffff]/[0.2] rounded-xl text-white focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-[#B75826] text-white rounded-full"
              >
                {popularId ? "Update Popular Data" : "Create Popular Data"}
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-[#B75826] text-white rounded-full"
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

export default Popular;
