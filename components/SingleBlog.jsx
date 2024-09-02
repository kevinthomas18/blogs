"use client";

import { useState } from "react";
import { useUser } from "@/components/UserContext";
import { useParams, useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { MdInsertChartOutlined } from "react-icons/md";
import CommentSection from "./CommentSection";
import Modal from "./Modal";
import ImageDrawer from "./ImageDrawer";
import SEODrawer from "./SEODrawer";
import { toast } from "react-toastify";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsSave2 } from "react-icons/bs";
import Link from "next/link";

const SingleBlog = ({ blog }) => {
  const { user } = useUser();
  const params = useParams();
  const isAuthor = user?.id === blog?.data?.author;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSEODrawerOpen, setIsSEODrawerOpen] = useState(false);

  const [selectedImages, setSelectedImages] = useState({
    banner: `https://blogs-23vc.onrender.com${blog?.data.banner?.path}` || "",
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
        toast.error("Blog deleted successfully!", { hideProgressBar: true });
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

  console.log(blog?.data);

  return (
    <>
      {isAuthor && (
        <div className="absolute flex flex-row space-y-2 top-40 left-10 md:flex-col md:space-x-2">
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
          <Link
            href={`/edit-blog/edit-images/${blog?.data.id}`}
            className="text-gray-600 hover:text-blue-600 font-semibold flex items-center"
            // onClick={handleOpenDrawer}
          >
            <FaImages className="mx-2" />
            Images
          </Link>
          <Link
            href={`/edit-blog/add-seo/${blog?.data.id}`}
            className="text-gray-600 hover:text-green-600 font-semibold flex items-center"
            // onClick={handleOpenSEODrawer}
          >
            <MdInsertChartOutlined className="mx-2" />
            SEO
          </Link>
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

      <div className="px-3 md:px-14 lg:px-60 xl:px-80 py-20">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mt-3 mb-10">
              {blog?.data.title}
            </h1>
          </div>
          <div className="relative flex items-center">
            <button className="text-2xl text-red-500 mr-4 relative group">
              <IoMdHeartEmpty />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
                Like
              </span>
            </button>
            <button className="text-2xl text-blue-500 relative group">
              <BsSave2 />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
                Save
              </span>
            </button>
          </div>
        </div>

        <h2 className=" font-semibold mt-3 mb-10">
          {blog?.data.top_description}
        </h2>
        <img
          src={selectedImages.banner || blog?.data?.banner?.path}
          alt="banner image"
        />
        {blog?.data.sections.map((section) => {
          return (
            <div key={section.heading} className="mt-5">
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
        <CommentSection params={params} blog={blog} />
      </div>
    </>
  );
};

export default SingleBlog;

// "use client";

// import { useState } from "react";
// import { useUser } from "@/components/UserContext";
// import { useParams, useRouter } from "next/navigation";
// import { CiEdit } from "react-icons/ci";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { FaImages } from "react-icons/fa";
// import { MdInsertChartOutlined } from "react-icons/md";
// import CommentSection from "./CommentSection";
// import Modal from "./Modal";
// import ImageDrawer from "./ImageDrawer";
// import SEODrawer from "./SEODrawer";
// import { toast } from "react-toastify";
// import { IoMdHeartEmpty } from "react-icons/io";
// import { BsSave2 } from "react-icons/bs";

// const SingleBlog = ({ blog }) => {
//   const { user } = useUser();
//   const params = useParams();
//   const isAuthor = user?.id === blog?.data?.author;
//   const router = useRouter();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isSEODrawerOpen, setIsSEODrawerOpen] = useState(false);

//   const [selectedImages, setSelectedImages] = useState({
//     banner: `https://blogs-23vc.onrender.com${blog?.data.banner?.path}` || "",
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
//         toast.error("Blog deleted successfully!", { hideProgressBar: true });
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

//   console.log(blog?.data);

//   return (
//     <>
//       {isAuthor && (
//         <div className="absolute flex flex-row space-y-2 top-40 left-10 md:flex-col md:space-x-2">
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

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleDelete}
//         title="Confirm Deletion"
//       >
//         <p className="mb-6">Are you sure you want to delete this blog post?</p>
//       </Modal>

//       <ImageDrawer
//         isOpen={isDrawerOpen}
//         onClose={handleCloseDrawer}
//         selectedImages={selectedImages}
//         onImageChange={handleImageChange}
//       />

//       <SEODrawer
//         isOpen={isSEODrawerOpen}
//         onClose={handleCloseSEODrawer}
//         seoData={seoData}
//         onSEOChange={handleSEOChange}
//         onSEOUpdate={handleSEOUpdate}
//       />

//       <div className="px-3 md:px-14 lg:px-60 xl:px-80 py-20">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold mt-3 mb-10">
//               {blog?.data.title}
//             </h1>
//           </div>
//           <div className="relative flex items-center">
//             <button className="text-2xl text-red-500 mr-4 relative group">
//               <IoMdHeartEmpty />
//               <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
//                 Like
//               </span>
//             </button>
//             <button className="text-2xl text-blue-500 relative group">
//               <BsSave2 />
//               <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
//                 Save
//               </span>
//             </button>
//           </div>
//         </div>

//         <h2 className=" font-semibold mt-3 mb-10">
//           {blog?.data.top_description}
//         </h2>
//         <img
//           src={selectedImages.banner || blog?.data?.banner?.path}
//           alt="banner image"
//         />
//         {blog?.data.sections.map((section) => {
//           return (
//             <div key={section.heading} className="mt-5">
//               <h3 className="font-bold mb-3">{section.heading}</h3>
//               <div dangerouslySetInnerHTML={{ __html: section.content }}></div>
//             </div>
//           );
//         })}

//         {/* Featured Image Display */}
//         {selectedImages.featured && (
//           <img
//             src={selectedImages.featured}
//             alt="Selected Featured"
//             className="w-full h-full object-cover rounded mt-4"
//           />
//         )}

//         <h3 className="font-semibold">{blog?.data.bottom_description}</h3>
//         <CommentSection params={params} blog={blog} />
//       </div>
//     </>
//   );
// };

// export default SingleBlog;
