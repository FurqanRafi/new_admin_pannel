"use client";

import { AuthContext } from "@/AppContext/AppContext";
import React, { useContext, useEffect, useState } from "react";

const Aboutsection = () => {
  const { getAbout, createAbout, addUpdateAbout, deleteAbout } =
    useContext(AuthContext);

  const [aboutData, setAboutData] = useState(false);
  const [formData, setFormData] = useState({
    aboutimg: "",
    upperimg: "",
    title: "",
    description: "",
    img1: "",
    img2: "",
    img3: "",
  });

  const [aboutId, setAboutId] = useState(null);
  const [popup, setPopup] = useState(false);
  const [updateAbout, setUpdateAbout] = useState(false);

  const loadData = async () => {
    const res = await getAbout();
    console.log(res, "get about");
    if (res) {
      setAboutData(res);
      setAboutId(res._id);
    } else {
      setAboutData(false);
      setAboutId(null);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (aboutId) {
      await addUpdateAbout(formData, aboutId);
    } else {
      console.log(formData);
      await createAbout(formData);
      alert("Created Data Successfully");
    }
    await loadData();
    setUpdateAbout(false);
  };

  const updateHandler = () => {
    if (aboutData) {
      setFormData({
        aboutimg: aboutData?.aboutimg || "",
        upperimg: aboutData?.upperimg || "",
        title: aboutData?.title || "",
        description: aboutData?.description || "",
        img1: aboutData?.img1 || "",
        img2: aboutData?.img2 || "",
        img3: aboutData?.img3 || "",
      });
      setUpdateAbout(true); // bas yahan tak
    }
  };

  const handleDelete = async () => {
    if (aboutId) {
      await deleteAbout(aboutId);
      alert("About Section is Deleted");
      setFormData({
        aboutimg: "",
        upperimg: "",
        title: "",
        description: "",
        img1: "",
        img2: "",
        img3: "",
      });
    }
    await loadData();
    setPopup(false);
  };

  return (
    <div className="w-full min-h-screen flex items-start py-10 justify-center">
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
                onClick={() => setPopup(false)}
                className="bg-gray-300 text-[#242220] px-4 py-2 rounded-lg font-medium hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-[95%] h-[95%] backdrop-blur-xl bg-[#ffffff]/[0.25] border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-xl">
        {/* Header */}
        <h1 className="text-3xl py-7 px-5 font-bold text-[#242220]">
          About Section Dashboard
        </h1>

        <div className="px-5 pb-7">
          {/* Current About Section */}
          {aboutData ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-[#242220] font-semibold">
                  Current About Section
                </h2>
                <div className="flex gap-5">
                  <button
                    onClick={() => setPopup(true)}
                    className="px-7 py-2 bg-[#B75826] text-white rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="w-full rounded-2xl bg-transparent border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] flex flex-col gap-10 p-10 mt-5">
                {/* About Heading */}
                <div>
                  <label className="text-sm font-medium text-[#242220]">
                    About Heading
                  </label>
                  <p className="text-[#242220] bg-white/50 p-3 rounded-xl mt-2">
                    {aboutData?.title}
                  </p>
                </div>

                {/* About Paragraph */}
                <div>
                  <label className="text-sm font-medium text-[#242220]">
                    About Paragraph
                  </label>
                  <p className="text-[#242220] bg-white/50 p-3 rounded-xl mt-2 leading-relaxed">
                    {aboutData?.description}
                  </p>
                </div>

                {/* Main Image */}
                <div>
                  <label className="text-sm font-medium text-[#242220]">
                    Main About Image
                  </label>
                  <div className="mt-2  p-10 rounded-xl flex items-center gap-10">
                    <img
                      src={aboutData?.upperimg}
                      alt={aboutData?.upperimg}
                      className="w-1/2 max-w-xs px-10 py-10 rounded-xl border border-[#ffffff]/[0.2]"
                    />
                    <img
                      src={aboutData?.aboutimg}
                      alt={aboutData?.aboutimg}
                      className="w-1/2 max-w-xs px-10 py-10 rounded-xl border border-[#ffffff]/[0.2]"
                    />
                  </div>
                </div>

                {/* Gallery Images */}
                <div>
                  <label className="text-sm font-medium text-[#242220]">
                    Gallery Images
                  </label>
                  <div className="grid md:grid-cols-3 gap-6 mt-3">
                    {[aboutData?.img1, aboutData?.img2, aboutData?.img3].map(
                      (img, idx) => (
                        <div
                          key={idx}
                          className="bg-white/50 p-3 rounded-xl border border-[#ffffff]/[0.2]"
                        >
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-[#242220]">
                              Image {idx + 1}
                            </span>
                          </div>
                          <p className="text-sm text-[#242220] break-all mb-2">
                            {img}
                          </p>
                          <img
                            src={img}
                            alt={`${img} ${idx + 1}`}
                            className="w-full max-w-32 rounded-xl border border-[#ffffff]/[0.2]"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full rounded-2xl border border-[#ffffff]/[0.1] shadow-[0_7px_30px_rgba(0,0,0,0.3)] flex flex-col items-center gap-10 p-20 mt-5">
                <h1 className="text-5xl text-[#242220] font-semibold">
                  No About Section
                </h1>
              </div>
            </>
          )}

          {/* Create New About Section */}
          <div className="w-full mt-10">
            <h2 className="text-2xl text-[#242220] font-semibold mb-4">
              Create About Section
            </h2>
            <div className="w-full rounded-2xl bg-transparent border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] p-10">
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#242220]">About Heading</label>
                    <input
                      type="text"
                      placeholder="Enter about heading"
                      className="w-full p-3 border border-[#ffffff]/50 rounded-xl"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#242220]">
                      Main About Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="Enter image URL"
                      className="w-full p-3 border border-[#ffffff]/50 rounded-xl"
                      value={formData.aboutimg}
                      onChange={(e) =>
                        setFormData({ ...formData, aboutimg: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="w-full flex gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#242220]">About Paragraph</label>
                    <textarea
                      rows="4"
                      placeholder="Enter about paragraph"
                      className="w-full p-3 border border-[#ffffff]/50 rounded-xl resize-none"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#242220]">UpperImage</label>
                    <input
                      type="text"
                      placeholder="Enter image URL"
                      className="w-full p-3 border border-[#ffffff]/50 rounded-xl"
                      value={formData.upperimg}
                      onChange={(e) =>
                        setFormData({ ...formData, upperimg: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <label className="text-[#242220]">
                        Gallery Image {i}
                      </label>
                      <input
                        type="text"
                        placeholder={`Image ${i} URL`}
                        className="w-full p-3 border border-[#ffffff]/50 rounded-xl"
                        value={formData[`img${i}`]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`img${i}`]: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#B75826] hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-200"
                  >
                    {aboutId ? "Update About" : "Create About"}
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-[#B75826] hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-200"
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

export default Aboutsection;
