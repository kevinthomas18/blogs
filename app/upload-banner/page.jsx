"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createNewPost } from "@/utils/actions";
import { toast } from "react-toastify";
import SideLinks from "@/components/SideLinks";

export default function UploadImage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [files, setFiles] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    const storedBlogData = sessionStorage.getItem("postData");
    if (storedBlogData) {
      try {
        setBlogData(JSON.parse(storedBlogData));
      } catch (error) {
        console.error("Failed to parse blogData:", error);
        toast.error("Invalid blog data provided. Please check your inputs.");
      }
    } else {
      toast.error("No blog data found. Please start again.");
      router.push("/create-blog");
    }
  }, [router]);

  const handleFileChange = (ev) => {
    setFiles(ev.target.files[0]);
  };

  const handleCreateBlog = async () => {
    if (!files) {
      toast.error("Please upload a banner image.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("image", files);
    formData.append("title", blogData.title);
    formData.append("top_description", blogData.topDescription);
    formData.append("short_description", blogData.topDescription);
    formData.append("bottom_description", blogData.bottomDescription);
    formData.append("sections", JSON.stringify(blogData.sections));
    formData.append("is_published", blogData.isPublished);
    formData.append("premium", blogData.premium);

    try {
      const result = await createNewPost(formData, session?.user.token);
      if (result.success) {
        router.push("/");
        toast.success("Blog created successfully!");
      } else {
        console.error("Submission failed:", result.error);
        toast.error("Failed to create blog. Please try again.");
      }
    } catch (err) {
      console.error("Error during submission:", err);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <SideLinks />
      <div className="mx-auto my-14 px-12 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
          Upload Banner Image
        </h2>

        {/* Banner Image Upload */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:space-x-8">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2 text-gray-700">
              Banner Image
            </h3>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                id="banner-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="banner-upload"
                className="inline-block w-full max-w-xs px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-lg cursor-pointer hover:bg-green-600 transition duration-300"
              >
                Choose Banner Image
              </label>
            </label>
          </div>
          {files && (
            <div className="mt-4 w-full md:w-48 h-32 border border-gray-300 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(files)}
                alt="Banner preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-20 flex justify-start space-x-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition duration-300"
          >
            Back
          </button>
          <button
            onClick={handleCreateBlog}
            disabled={isSubmitting}
            className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition duration-300"
          >
            {isSubmitting ? "Creating..." : "Create Blog"}
          </button>
          <button
            onClick={() => toast.info("Blog saved!")}
            className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg font-medium transition duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { createNewPost } from "@/utils/actions";
// import { toast } from "react-toastify";

// export default function UploadImage() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [files, setFiles] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [blogData, setBlogData] = useState({});

//   useEffect(() => {
//     // Retrieve blog data from session storage
//     const storedBlogData = sessionStorage.getItem("postData");
//     if (storedBlogData) {
//       try {
//         setBlogData(JSON.parse(storedBlogData));
//       } catch (error) {
//         console.error("Failed to parse blogData:", error);
//         toast.error("Invalid blog data provided. Please check your inputs.");
//       }
//     } else {
//       toast.error("No blog data found. Please start again.");
//       router.push("/create-blog");
//     }
//   }, [router]);

//   const handleFileChange = (ev) => {
//     setFiles(ev.target.files[0]);
//   };

//   const handleCreateBlog = async () => {
//     if (!files) {
//       toast.error("Please upload a banner image.");
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("image", files);
//     formData.append("title", blogData.title);
//     formData.append("top_description", blogData.topDescription);
//     formData.append("short_description", blogData.topDescription);
//     formData.append("bottom_description", blogData.bottomDescription);
//     formData.append("sections", JSON.stringify(blogData.sections));
//     formData.append("is_published", blogData.isPublished);
//     formData.append("premium", blogData.premium);

//     try {
//       const result = await createNewPost(formData, session?.user.token);
//       if (result.success) {
//         router.push("/");
//         toast.success("Blog created successfully!");
//       } else {
//         console.error("Submission failed:", result.error);
//         toast.error("Failed to create blog. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error during submission:", err);
//       toast.error("Failed to create blog. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen px-4 py-20">
//       <div className="w-full max-w-lg">
//         <h2 className="text-2xl font-semibold text-center mb-8">
//           Upload Banner Image
//         </h2>
//         <div className="mb-6">
//           <label
//             htmlFor="banner-image"
//             className="block text-lg font-semibold mb-2"
//           >
//             Choose Banner Image
//           </label>
//           <input
//             id="banner-image"
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="border p-3 rounded w-full"
//           />
//         </div>

//         <button
//           onClick={handleCreateBlog}
//           disabled={isSubmitting}
//           className="py-2 px-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition duration-300 ease-in-out transform"
//         >
//           {isSubmitting ? "Creating..." : "Create Blog"}
//         </button>
//       </div>
//     </div>
//   );
// }
