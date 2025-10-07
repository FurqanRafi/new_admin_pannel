"use client";

import { AuthContext } from "@/AppContext/AppContext";
import React, { useContext, useEffect, useState } from "react";

const Cards = () => {
  const { getCards, createCards, addUpdateCards, deleteCards } =
    useContext(AuthContext);

  const [cardsData, setCardsData] = useState(null);
  const [formData, setFormData] = useState({
    cardimg1: "",
    cardimg2: "",
    cardimg3: "",
    cardimg4: "",
  });

  const [cardsId, setCardsId] = useState(null);
  const [popup, setPopup] = useState(false);
  const [updateCards, setUpdateCards] = useState(false);
  const [loading, setloading] = useState(false);

  const loadData = async () => {
    try {
      setloading(true);
      const res = await getCards();
      console.log(res, "get Cards");
      if (res) {
        setCardsData(res);
        setCardsId(res._id);
      } else {
        setCardsData(null);
        setCardsId(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (cardsId) {
      await addUpdateCards(formData, cardsId);
      alert("Cards are Updated");
    } else {
      await createCards(formData);
      alert("Created the Data");
    }
    await loadData();
    setUpdateCards(false);
  };

  const updateHandler = async () => {
    if (cardsData) {
      setFormData({
        cardimg1: cardsData?.Cardimg1 || "",
        cardimg2: cardsData?.Cardimg2 || "",
        cardimg3: cardsData?.Cardimg3 || "",
        cardimg4: cardsData?.Cardimg4 || "",
      });
    }
    setUpdateCards(true);
  };

  const handleDelete = async () => {
    if (cardsId) {
      await deleteCards(cardsId);
      alert("Cards are Deleted");
      setFormData({
        cardimg1: "",
        cardimg2: "",
        cardimg3: "",
        cardimg4: "",
      });
    }
    await loadData();
    setPopup(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-center backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#B75826] mx-auto"></div>
          <p className="mt-6 text-[#a15102] font-bold text-lg uppercase tracking-wide">
            Loading Cards...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-start py-10 justify-center backdrop-blur-xl  border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)">
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/ backdrop-blur-lg z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-100 text-center">
            <h2 className="text-lg font-semibold text-[#a15102] mb-4">
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
                className="bg-gray-300 text-[#a15102] px-4 py-2 rounded-lg font-medium hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-[95%] h-auto backdrop-blur-xl  border-[#ffffff]/[0.1] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-xl">
        {/* Header */}
        <h1 className="text-3xl py-7 px-5 font-bold text-[#a15102]">
          Cards Section Dashboard
        </h1>

        <div className="px-5 pb-7">
          {/* Current Section */}
          <div className="w-full h-[80%] rounded-2xl  flex flex-col gap-5  ">
            {cardsData ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl text-white font-semibold">
                    Current Cards Section
                  </h2>
                  <div className="flex gap-5">
                    <button
                      className="px-7 py-2 bg-[#B75826] text-white rounded-full hover:bg-[#9c4519] transition-all"
                      onClick={updateHandler}
                    >
                      Update
                    </button>

                    <button
                      onClick={() => setPopup(true)}
                      className="px-7 py-2 bg-[#B75826] text-white rounded-full"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {/* Display the Cards Data */}
                <div className="w-full rounded-2xl bg-transparent border-[#ffffff]/[0.1] border-1 shadow-[0_7px_30px_rgba(0,0,0,0.3)] p-10 mt-5">
                  <h2 className="text-2xl text-white font-semibold mb-6">
                    Cards Section
                  </h2>

                  <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-5 border border-amber-200/40 rounded-xl bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md hover:scale-105 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] transition-all duration-300">
                      <img
                        src={cardsData.Cardimg1 ?? ""}
                        alt={cardsData.Cardimg1}
                        className="w-full h-48 object-cover text-[#773e04] rounded-lg"
                      />
                    </div>

                    <div className="p-5 border border-amber-200/40 rounded-xl bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md hover:scale-105 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] transition-all duration-300">
                      <img
                        src={cardsData.Cardimg2 ?? ""}
                        alt={cardsData.Cardimg2}
                        className="w-full h-48 object-cover text-[#773e04]  rounded-lg"
                      />
                    </div>

                    <div className="p-5 border border-amber-200/40 rounded-xl bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md hover:scale-105 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] transition-all duration-300">
                      <img
                        src={cardsData.Cardimg3 ?? ""}
                        alt={cardsData.Cardimg3}
                        className="w-full h-48 object-cover text-[#773e04]  rounded-lg"
                      />
                    </div>

                    <div className="p-5 border border-amber-200/40 rounded-xl bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md hover:scale-105 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] transition-all duration-300">
                      <img
                        src={cardsData.Cardimg4 ?? ""}
                        alt={cardsData.Cardimg4}
                        className="w-full h-48 object-cover text-[#773e04]  rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Empty State */}
                <div className="w-full rounded-2xl border border-[#ffffff]/[0.1] shadow-[0_7px_30px_rgba(0,0,0,0.3)] flex flex-col items-center gap-10 p-20 mt-5">
                  <h1 className="text-5xl text-white font-semibold">
                    No Cards Section
                  </h1>
                </div>
              </>
            )}
          </div>

          {/* Create Form */}
          <div className="w-full mt-7">
            <h1 className="text-white   text-2xl font-semibold">
              Create Cards Section
            </h1>
            <div className="w-full px-10 py-8 mt-7 rounded-2xl border border-[#ffffff]/[0.1] shadow-[0_7px_30px_rgba(0,0,0,0.3)]">
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3">
                    <label className="text-white">Card Image 1 URL</label>
                    <input
                      type="text"
                      placeholder="https://example.com/card1.jpg"
                      className="w-full p-3 text-white  border border-[#ffffff]/30 rounded-xl"
                      value={formData.cardimg1 ?? ""}
                      onChange={(e) => {
                        setFormData({ ...formData, cardimg1: e.target.value });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-white">Card Image 2 URL</label>
                    <input
                      type="text"
                      placeholder="https://example.com/card2.jpg"
                      className="w-full p-3 text-white  border border-[#ffffff]/30 rounded-xl"
                      value={formData.cardimg2 ?? ""}
                      onChange={(e) => {
                        setFormData({ ...formData, cardimg2: e.target.value });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-white">Card Image 3 URL</label>
                    <input
                      type="text"
                      placeholder="https://example.com/card3.jpg"
                      className="w-full p-3 text-white  border border-[#ffffff]/30 rounded-xl"
                      value={formData.cardimg3 ?? ""}
                      onChange={(e) => {
                        setFormData({ ...formData, cardimg3: e.target.value });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-white">Card Image 4 URL</label>
                    <input
                      type="text"
                      placeholder="https://example.com/card4.jpg"
                      className="w-full p-3 text-white  border border-[#ffffff]/30 rounded-xl"
                      value={formData.cardimg4 ?? ""}
                      onChange={(e) => {
                        setFormData({ ...formData, cardimg4: e.target.value });
                      }}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#B75826] hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-200"
                  >
                    {cardsId ? "Update Cards" : "Create Cards"}
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

export default Cards;
