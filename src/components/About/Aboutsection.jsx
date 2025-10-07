// "use client";

// import { AuthContext } from "@/AppContext/AppContext";
// import React, { useContext, useEffect, useState } from "react";

// const Aboutsection = () => {
//   const { getAbout, createAbout, addUpdateAbout, deleteAbout } =
//     useContext(AuthContext);

//   const [aboutData, setAboutData] = useState(false);
//   const [formData, setFormData] = useState({
//     aboutimg: "",
//     upperimg: "",
//     title: "",
//     description: "",
//     img1: "",
//     img2: "",
//     img3: "",
//   });

//   const [aboutId, setAboutId] = useState(null);
//   const [popup, setPopup] = useState(false);
//   const [create, setCreate] = useState(false);

//   const loadData = async () => {
//     const res = await getAbout();
//     console.log(res, "get about");
//     if (res) {
//       setAboutData(res);
//       setAboutId(res._id);
//     } else {
//       setAboutData(false);
//       setAboutId(null);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (aboutId) {
//       await addUpdateAbout(formData, aboutId);
//     } else {
//       await createAbout(formData);
//       alert("Created Data Successfully");
//     }
//     await loadData();
//     setCreate(false);
//   };

//   const handleDelete = async () => {
//     if (aboutId) {
//       await deleteAbout(aboutId);
//       alert("About Section is Deleted");
//       setFormData({
//         aboutimg: "",
//         upperimg: "",
//         title: "",
//         description: "",
//         img1: "",
//         img2: "",
//         img3: "",
//       });
//     }
//     await loadData();
//     setPopup(false);
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center justify-start py-10 gap-10">
//       {/* Delete Popup */}
//       {popup && (
//         <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg z-50">
//           <div className="bg-white rounded-xl shadow-lg p-8 w-100 text-center">
//             <h2 className="text-lg font-semibold text-[#242220] mb-4">
//               Are you sure you want to Delete?
//             </h2>
//             <div className="flex justify-around mt-4">
//               <button
//                 onClick={handleDelete}
//                 className="bg-[#B75826] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#9c4519]"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={() => setPopup(false)}
//                 className="bg-gray-300 text-[#242220] px-4 py-2 rounded-lg font-medium hover:bg-gray-400"
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create/Update Section */}
//       <div className="w-[95%] backdrop-blur-xl border-[#F5EFEB]/[0.20] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-xl">
//         <h1 className="text-3xl py-7 px-5 font-bold text-[#242220]">
//           About Section Dashboard
//         </h1>

//         <div className="px-5 pb-7">
//           <div className="flex justify-between items-center mb-5">
//             <h2 className="text-2xl text-[#242220] font-semibold">
//               Current About Section
//             </h2>
//           </div>

//           {/* Toggle Create Button */}
//           <button
//             onClick={() => {
//               setCreate(!create);
//             }}
//             className="px-7 py-3 bg-[#B75826] text-white rounded-full mb-5"
//             disabled={aboutData && !create}
//           >
//             {create ? "Close Form" : "Create About"}
//           </button>

//           {/* Create/Update Form */}
//           {create && (
//             <form
//               onSubmit={submitHandler}
//               className="space-y-4 p-5 backdrop-blur-xl rounded-xl bg-[#FFEDE0]/[0.3] border-[#F5EFEB]/[0.20] border shadow-[0_7px_30px_rgba(0,0,0,0.3)]"
//             >
//               <div className="flex flex-col gap-3">
//                 <label className="text-[#242220] font-bold">About Heading</label>
//                 <input
//                   type="text"
//                   placeholder="Enter about heading"
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col gap-3">
//                 <label className="text-[#242220] font-bold">About Paragraph</label>
//                 <textarea
//                   rows="4"
//                   placeholder="Enter about paragraph"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   className="w-full p-2 border rounded-md resize-none"
//                 ></textarea>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="flex flex-col gap-3">
//                   <label className="text-[#242220] font-bold">Main Image URL</label>
//                   <input
//                     type="text"
//                     placeholder="Enter main image URL"
//                     value={formData.aboutimg}
//                     onChange={(e) =>
//                       setFormData({ ...formData, aboutimg: e.target.value })
//                     }
//                     className="w-full p-2 border rounded-md"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-3">
//                   <label className="text-[#242220] font-bold">Upper Image URL</label>
//                   <input
//                     type="text"
//                     placeholder="Enter upper image URL"
//                     value={formData.upperimg}
//                     onChange={(e) =>
//                       setFormData({ ...formData, upperimg: e.target.value })
//                     }
//                     className="w-full p-2 border rounded-md"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-3 gap-4">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="flex flex-col gap-3">
//                     <label className="text-[#242220] font-bold">
//                       Gallery Image {i}
//                     </label>
//                     <input
//                       type="text"
//                       placeholder={`Image ${i} URL`}
//                       value={formData[`img${i}`]}
//                       onChange={(e) =>
//                         setFormData({ ...formData, [`img${i}`]: e.target.value })
//                       }
//                       className="w-full p-2 border rounded-md"
//                     />
//                   </div>
//                 ))}
//               </div>

//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-[#B75826] hover:bg-red-500 text-white rounded-md"
//               >
//                 {aboutId ? "Update About" : "Create About"}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>

//       {/* Display Current About Section */}
//       <div className="w-[95%] backdrop-blur-xl border border-[#F5EFEB]/[0.20] shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden">
//         <div className="px-10 py-10">
//           {aboutData ? (
//             <>
//               {/* Header with Update/Delete buttons */}
//               <div className="mb-8 flex justify-between items-start">
//                 <div className="flex-1">
//                   <div className="font-bold text-xl uppercase tracking-wide mb-4 px-4">
//                     About Content
//                   </div>
//                 </div>
//                 <div className="flex gap-5">
//                   <button
//                     onClick={() => {
//                       setCreate(true);
//                       setFormData({
//                         aboutimg: aboutData?.aboutimg || "",
//                         upperimg: aboutData?.upperimg || "",
//                         title: aboutData?.title || "",
//                         description: aboutData?.description || "",
//                         img1: aboutData?.img1 || "",
//                         img2: aboutData?.img2 || "",
//                         img3: aboutData?.img3 || "",
//                       });
//                     }}
//                     className="px-7 py-3 bg-[#B75826] rounded-full text-white"
//                   >
//                     Update About
//                   </button>
//                   <button
//                     onClick={() => setPopup(true)}
//                     className="px-7 py-2 bg-[#B75826] rounded-full text-white"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>

//               {/* Title Section */}
//               <div className="mb-8">
//                 <div className="grid grid-cols-1 gap-4 mb-4 px-4">
//                   <div className="font-bold text-xl uppercase tracking-wide">
//                     Title
//                   </div>
//                 </div>
//                 <div className="p-5 text-gray-700 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
//                   {aboutData.title}
//                 </div>
//               </div>

//               {/* Description Section */}
//               <div className="mb-8">
//                 <div className="grid grid-cols-1 gap-4 mb-4 px-4">
//                   <div className="font-bold text-xl uppercase tracking-wide">
//                     Description
//                   </div>
//                 </div>
//                 <div className="p-5 text-gray-700 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
//                   {aboutData.description}
//                 </div>
//               </div>

//               {/* Main Images Section */}
//               <div className="mb-8">
//                 <div className="font-bold text-xl uppercase tracking-wide mb-4 px-4">
//                   Main Images
//                 </div>
//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="px-8 py-20 border border-amber-100/40 rounded-lg bg-white/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
//                     <img
//                       src={aboutData.upperimg}
//                       alt="Upper"
//                       className="w-full h-auto"
//                     />
//                   </div>
//                   <div className="px-8 py-20 border border-amber-100/40 rounded-lg bg-white/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
//                     <img
//                       src={aboutData.aboutimg}
//                       alt="Main"
//                       className="w-full h-auto"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Gallery Images Section */}
//               <div>
//                 <div className="font-bold text-xl uppercase tracking-wide mb-4 px-4">
//                   Gallery Images
//                 </div>
//                 <div className="grid grid-cols-3 gap-4">
//                   {[aboutData.img1, aboutData.img2, aboutData.img3].map(
//                     (img, idx) => (
//                       <div
//                         key={idx}
//                         className="group p-5 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300"
//                       >
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="w-2 h-2 bg-amber-500 rounded-full group-hover:animate-pulse"></div>
//                           <span className="text-gray-800 font-semibold">
//                             Image {idx + 1}
//                           </span>
//                         </div>
//                         <img
//                           src={img}
//                           alt={`Gallery ${idx + 1}`}
//                           className="w-full h-32 object-cover rounded-lg"
//                         />
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-20">
//               <h2 className="text-3xl text-gray-500">
//                 No About Section Available
//               </h2>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Aboutsection;

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
  const [create, setCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await getAbout();
    console.log(res, "get about");
    if (res) {
      setAboutData(res);
      setAboutId(res._id);
    } else {
      setAboutData(false);
      setAboutId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (aboutId) {
      await addUpdateAbout(formData, aboutId);
    } else {
      await createAbout(formData);
      alert("Created Data Successfully");
    }
    await loadData();
    setCreate(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-center backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#B75826] mx-auto"></div>
          <p className="mt-6 text-[#242220] font-bold text-lg uppercase tracking-wide">
            Loading ABOUT...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start py-10 gap-10">
      {/* Delete Popup */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg z-50">
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

      {/* Create/Update Section */}
      <div className="w-[95%] backdrop-blur-xl border-[#F5EFEB]/[0.20] border shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-xl">
        <h1 className="text-3xl py-7 px-5 font-bold text-white">
          About Section Dashboard
        </h1>

        <div className="px-5 pb-7">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl text-white font-semibold">
              Current About Section
            </h2>
          </div>

          {/* Toggle Create Button */}
          <button
            onClick={() => {
              setCreate(!create);
            }}
            className="px-7 py-3 bg-[#B75826] text-white rounded-full mb-5"
            disabled={aboutData && !create}
          >
            {create ? "Close Form" : "Create About"}
          </button>

          {/* Create/Update Form */}
          {create && (
            <form
              onSubmit={submitHandler}
              className="space-y-4 p-5 backdrop-blur-xl rounded-xl bg-[#FFEDE0]/[0.3] border-[#F5EFEB]/[0.20] border shadow-[0_7px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="flex flex-col gap-3">
                <label className="text-white font-bold">About Heading</label>
                <input
                  type="text"
                  placeholder="Enter about heading"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-white font-bold">About Paragraph</label>
                <textarea
                  rows="4"
                  placeholder="Enter about paragraph"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-md resize-none"
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <label className="text-white font-bold">Main Image URL</label>
                  <input
                    type="text"
                    placeholder="Enter main image URL"
                    value={formData.aboutimg}
                    onChange={(e) =>
                      setFormData({ ...formData, aboutimg: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-white font-bold">
                    Upper Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="Enter upper image URL"
                    value={formData.upperimg}
                    onChange={(e) =>
                      setFormData({ ...formData, upperimg: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <label className="text-white font-bold">
                      Gallery Image {i}
                    </label>
                    <input
                      type="text"
                      placeholder={`Image ${i} URL`}
                      value={formData[`img${i}`]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`img${i}`]: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-[#B75826] hover:bg-red-500 text-white rounded-md"
              >
                {aboutId ? "Update About" : "Create About"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Display Current About Section */}
      <div className="w-[95%] backdrop-blur-xl border border-[#F5EFEB]/[0.20] shadow-[0_7px_30px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden">
        <div className="px-10 py-10">
          {aboutData ? (
            <>
              {/* Header with Update/Delete buttons */}
              <div className="mb-8 flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-bold text-white text-xl uppercase tracking-wide mb-4 px-4">
                    About Content
                  </div>
                </div>
                <div className="flex gap-5">
                  <button
                    onClick={() => {
                      setCreate(true);
                      setFormData({
                        aboutimg: aboutData?.aboutimg || "",
                        upperimg: aboutData?.upperimg || "",
                        title: aboutData?.title || "",
                        description: aboutData?.description || "",
                        img1: aboutData?.img1 || "",
                        img2: aboutData?.img2 || "",
                        img3: aboutData?.img3 || "",
                      });
                    }}
                    className="px-7 py-3 bg-[#B75826] rounded-full text-white"
                  >
                    Update About
                  </button>
                  <button
                    onClick={() => setPopup(true)}
                    className="px-7 py-2 bg-[#B75826] rounded-full text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Title Section */}
              <div className="mb-8">
                <div className="grid grid-cols-1 gap-4 mb-4 px-4">
                  <div className="font-bold text-white text-xl uppercase tracking-wide">
                    Title
                  </div>
                </div>
                <div className="p-5 text-gray-700 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
                  {aboutData.title}
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <div className="grid grid-cols-1 gap-4 mb-4 px-4">
                  <div className="font-bold text-white text-xl uppercase tracking-wide">
                    Description
                  </div>
                </div>
                <div className="p-5 text-gray-700 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300">
                  {aboutData.description}
                </div>
              </div>

              {/* Main Images Section */}
              <div className="mb-8">
                <div className="font-bold text-white text-xl uppercase tracking-wide mb-4 px-4">
                  Main Images
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="px-8 py-20 border border-amber-100/40 rounded-lg bg-white/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                    <img
                      src={aboutData.upperimg}
                      alt="Upper"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="px-8 py-20 border border-amber-100/40 rounded-lg bg-white/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                    <img
                      src={aboutData.aboutimg}
                      alt="Main"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Gallery Images Section */}
              <div>
                <div className="font-bold text-white text-xl uppercase tracking-wide mb-4 px-4">
                  Gallery Images
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[aboutData.img1, aboutData.img2, aboutData.img3].map(
                    (img, idx) => (
                      <div
                        key={idx}
                        className="group p-5 bg-gradient-to-r from-white/50 to-amber-50/30 backdrop-blur-md rounded-xl border border-amber-200/40 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(218,165,32,0.2)] hover:scale-105 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full group-hover:animate-pulse"></div>
                          <span className="text-gray-800 font-semibold">
                            Image {idx + 1}
                          </span>
                        </div>
                        <img
                          src={img}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-3xl text-white ">
                No About Section Available
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Aboutsection;
