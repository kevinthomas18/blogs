"use client";

import { useState } from "react";
import { useUser } from "@/components/UserContext";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { MdInsertChartOutlined } from "react-icons/md";
import CommentSection from "./CommentSection";
import Modal from "./Modal";
import ImageDrawer from "./ImageDrawer";
import SEODrawer from "./SEODrawer";

const SingleBlog = ({ blog }) => {
  const { user } = useUser();
  const isAuthor = user?.id === blog?.data?.author;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSEODrawerOpen, setIsSEODrawerOpen] = useState(false);

  const [selectedImages, setSelectedImages] = useState({
    banner: `https://blogs-23vc.onrender.com${blog.data.banner?.path}` || "",
    featured: "",
    thumbnail: "",
  });
  const [seoData, setSeoData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  const handleEdit = () => {
    router.push(`/edit-blog/${blog?.data.id}`);
  };

  const handleDelete = async () => {
    const token = user?.token;

    try {
      const response = await fetch(
        `https://blogs-23vc.onrender.com/blogs/${blog?.data.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setIsModalOpen(false);
        router.replace("/");
      } else {
        const errorText = await response.text();
        console.error("Failed to delete blog:", errorText);
      }
    } catch (error) {
      console.error(
        "An error occurred while deleting the blog:",
        error.message
      );
    }
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenSEODrawer = () => {
    setIsSEODrawerOpen(true);
  };

  const handleCloseSEODrawer = () => {
    setIsSEODrawerOpen(false);
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImages((prev) => ({ ...prev, [type]: imageUrl }));
    }
  };

  const handleSEOChange = (e) => {
    const { name, value } = e.target;
    setSeoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSEOUpdate = () => {
    // Logic to handle SEO update (e.g., API call to save SEO data)
    console.log("SEO Data Updated:", seoData);
    handleCloseSEODrawer();
  };

  console.log(blog.data);

  return (
    <>
      {isAuthor && (
        <div className="absolute flex flex-col space-y-2 top-40 left-10 justify-start">
          <button
            className="text-gray-600 hover:text-orange-400 font-semibold flex items-center"
            onClick={handleEdit}
          >
            <CiEdit className="mx-2" />
            Edit
          </button>
          <button
            className="text-gray-600 hover:text-red-600 font-semibold flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <RiDeleteBin6Line className="mx-2" />
            Delete
          </button>
          <button
            className="text-gray-600 hover:text-blue-600 font-semibold flex items-center"
            onClick={handleOpenDrawer}
          >
            <FaImages className="mx-2" />
            Images
          </button>
          <button
            className="text-gray-600 hover:text-green-600 font-semibold flex items-center"
            onClick={handleOpenSEODrawer}
          >
            <MdInsertChartOutlined className="mx-2" />
            SEO
          </button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
      >
        <p className="mb-6">Are you sure you want to delete this blog post?</p>
      </Modal>

      <ImageDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        selectedImages={selectedImages}
        onImageChange={handleImageChange}
      />

      <SEODrawer
        isOpen={isSEODrawerOpen}
        onClose={handleCloseSEODrawer}
        seoData={seoData}
        onSEOChange={handleSEOChange}
        onSEOUpdate={handleSEOUpdate}
      />

      <div className="px-3 md:px-24 lg:px-60 xl:px-80 py-20">
        <h1 className="text-2xl font-bold mt-3 mb-10">{blog?.data.title}</h1>
        <h2 className=" font-semibold mt-3 mb-10">
          {blog?.data.top_description}
        </h2>
        <img
          src={selectedImages.banner || blog?.data?.banner?.path}
          alt="banner image"
        />
        {blog?.data.sections.map((section) => {
          return (
            <div className="mt-5">
              <h3 className="font-bold mb-3">{section.heading}</h3>
              <div dangerouslySetInnerHTML={{ __html: section.content }}></div>
            </div>
          );
        })}

        {/* Featured Image Display */}
        {selectedImages.featured && (
          <img
            src={selectedImages.featured}
            alt="Selected Featured"
            className="w-full h-full object-cover rounded mt-4"
          />
        )}

        <h3 className="font-semibold">{blog?.data.bottom_description}</h3>
        <CommentSection />
      </div>
    </>
  );
};

export default SingleBlog;

// "use client";

// import { useState } from "react";
// import { useUser } from "@/components/UserContext";
// import { useRouter } from "next/navigation";
// import { CiEdit } from "react-icons/ci";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { FaImages } from "react-icons/fa";
// import { MdInsertChartOutlined } from "react-icons/md";
// import CommentSection from "./CommentSection";

// const SingleBlog = ({ blog }) => {
//   const { user } = useUser();
//   const isAuthor = user?.id === blog?.data?.author;
//   const router = useRouter();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isSEODrawerOpen, setIsSEODrawerOpen] = useState(false);
//   const [selectedImages, setSelectedImages] = useState({
//     banner: blog?.data?.banner?.path || "",
//     featured: "",
//     thumbnail: "",
//   });
//   const [seoData, setSeoData] = useState({
//     metaTitle: "",
//     metaDescription: "",
//     keywords: "",
//   });

//   const handleEdit = () => {
//     router.push(`/edit-blog/${blog?.data.id}`);
//   };

//   const handleDelete = async () => {
//     const token = user?.token;

//     try {
//       const response = await fetch(
//         `https://blogs-23vc.onrender.com/blogs/${blog?.data.id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         setIsModalOpen(false);
//         router.replace("/");
//       } else {
//         const errorText = await response.text();
//         console.error("Failed to delete blog:", errorText);
//       }
//     } catch (error) {
//       console.error(
//         "An error occurred while deleting the blog:",
//         error.message
//       );
//     }
//   };

//   const handleOpenDrawer = () => {
//     setIsDrawerOpen(true);
//   };

//   const handleCloseDrawer = () => {
//     setIsDrawerOpen(false);
//   };

//   const handleOpenSEODrawer = () => {
//     setIsSEODrawerOpen(true);
//   };

//   const handleCloseSEODrawer = () => {
//     setIsSEODrawerOpen(false);
//   };

//   const handleImageChange = (e, type) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setSelectedImages((prev) => ({ ...prev, [type]: imageUrl }));
//     }
//   };

//   const handleSEOChange = (e) => {
//     const { name, value } = e.target;
//     setSeoData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSEOUpdate = () => {
//     // Logic to handle SEO update (e.g., API call to save SEO data)
//     console.log("SEO Data Updated:", seoData);
//     handleCloseSEODrawer();
//   };

//   return (
//     <>
//       {isAuthor && (
//         <div className="absolute flex flex-col space-y-2 top-40 left-10 justify-start">
//           <button
//             className="text-gray-600 hover:text-orange-400 font-semibold flex items-center"
//             onClick={handleEdit}
//           >
//             <CiEdit className="mx-2" />
//             Edit
//           </button>
//           <button
//             className="text-gray-600 hover:text-red-600 font-semibold flex items-center"
//             onClick={() => setIsModalOpen(true)}
//           >
//             <RiDeleteBin6Line className="mx-2" />
//             Delete
//           </button>
//           <button
//             className="text-gray-600 hover:text-blue-600 font-semibold flex items-center"
//             onClick={handleOpenDrawer}
//           >
//             <FaImages className="mx-2" />
//             Images
//           </button>
//           <button
//             className="text-gray-600 hover:text-green-600 font-semibold flex items-center"
//             onClick={handleOpenSEODrawer}
//           >
//             <MdInsertChartOutlined className="mx-2" />
//             SEO
//           </button>
//         </div>
//       )}

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
//             <p className="mb-6">
//               Are you sure you want to delete this blog post?
//             </p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isDrawerOpen && (
//         <div className="fixed inset-0 flex justify-end z-50">
//           <div className="bg-white w-96 h-full shadow-lg overflow-y-auto">
//             <div className="p-4">
//               <h2 className="text-lg font-semibold mb-4">Manage Images</h2>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Banner Image
//                 </label>
//                 <input
//                   type="file"
//                   className="block w-full text-sm"
//                   onChange={(e) => handleImageChange(e, "banner")}
//                 />
//                 {selectedImages.banner && (
//                   <img
//                     src={selectedImages.banner}
//                     alt="Selected Banner"
//                     className="mt-4 w-full h-40 object-cover rounded"
//                   />
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Featured Image
//                 </label>
//                 <input
//                   type="file"
//                   className="block w-full text-sm"
//                   onChange={(e) => handleImageChange(e, "featured")}
//                 />
//                 {selectedImages.featured && (
//                   <img
//                     src={selectedImages.featured}
//                     alt="Selected Featured"
//                     className="mt-4 w-full h-40 object-cover rounded"
//                   />
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Thumbnails
//                 </label>
//                 <input
//                   type="file"
//                   className="block w-full text-sm"
//                   onChange={(e) => handleImageChange(e, "thumbnail")}
//                 />
//                 {selectedImages.thumbnail && (
//                   <img
//                     src={selectedImages.thumbnail}
//                     alt="Selected Thumbnail"
//                     className="mt-4 w-full h-40 object-cover rounded"
//                   />
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Alt Texts
//                 </label>
//                 <input type="text" className="block w-full text-sm" />
//               </div>
//               <button
//                 onClick={handleCloseDrawer}
//                 className="mt-4 mr-2 px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded"
//               >
//                 Update
//               </button>
//               <button
//                 onClick={handleCloseDrawer}
//                 className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//           <div
//             className="flex-1 bg-black bg-opacity-50"
//             onClick={handleCloseDrawer}
//           ></div>
//         </div>
//       )}

//       {isSEODrawerOpen && (
//         <div className="fixed inset-0 flex justify-end z-50">
//           <div className="bg-white w-96 h-full shadow-lg overflow-y-auto">
//             <div className="p-4">
//               <h2 className="text-lg font-semibold mb-4">Manage SEO</h2>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Meta Title
//                 </label>
//                 <input
//                   type="text"
//                   name="metaTitle"
//                   value={seoData.metaTitle}
//                   onChange={handleSEOChange}
//                   className="block w-full text-sm p-2 border border-gray-300 rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Meta Description
//                 </label>
//                 <textarea
//                   name="metaDescription"
//                   value={seoData.metaDescription}
//                   onChange={handleSEOChange}
//                   rows="4"
//                   className="block w-full text-sm p-2 border border-gray-300 rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Keywords
//                 </label>
//                 <input
//                   type="text"
//                   name="keywords"
//                   value={seoData.keywords}
//                   onChange={handleSEOChange}
//                   className="block w-full text-sm p-2 border border-gray-300 rounded"
//                 />
//               </div>
//               <button
//                 onClick={handleSEOUpdate}
//                 className="mt-4 mr-2 px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded"
//               >
//                 Update
//               </button>
//               <button
//                 onClick={handleCloseSEODrawer}
//                 className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//           <div
//             className="flex-1 bg-black bg-opacity-50"
//             onClick={handleCloseSEODrawer}
//           ></div>
//         </div>
//       )}

//       <div className="px-3 md:px-24 lg:px-60 xl:px-80 py-20">
//         <h1 className="text-2xl font-bold mt-3 mb-10">{blog?.data.title}</h1>
//         <img
//           src={selectedImages.banner || blog?.data?.banner?.path}
//           alt="banner image"
//         />
//         <div
//           className="text-gray-600 my-8"
//           dangerouslySetInnerHTML={{ __html: blog?.data.description }}
//         ></div>

//         {/* Featured Image Display */}
//         {selectedImages.featured && (
//           <img
//             src={selectedImages.featured}
//             alt="Selected Featured"
//             className="w-full h-full object-cover rounded mt-4"
//           />
//         )}
//         <CommentSection />
//       </div>
//     </>
//   );
// };

// export default SingleBlog;
