"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams, redirect } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import Editor from "@/components/Editor";
import { getBlogDetail } from "@/utils/actions";

export default function EditBlogPage() {
  const { slug } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [premium, setPremium] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      const blog = await getBlogDetail(slug, session?.user?.token);

      if (blog) {
        setTitle(blog.data.title);
        setSummary(blog.data.short_description);
        setContent(blog.data.description);
        setIsPublished(blog.data.is_published);
        setPremium(blog.data.premium);
      }
    };

    if (slug && session?.user?.token) {
      fetchBlogData();
    }
  }, [slug, session?.user?.token]);

  async function handleSubmit(ev) {
    ev.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("short_description", summary);
    formData.set("description", content);
    formData.set("is_published", isPublished);
    formData.set("premium", premium);

    if (files) {
      formData.set("image", files);
    }
    console.log(formData.get("image"));
    console.log(files);

    try {
      const response = await fetch(
        `https://blogs-23vc.onrender.com/blogs/${slug}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Update failed:", result.error);
      }
    } catch (error) {
      console.error("An error occurred while updating the blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="px-3 md:px-24 lg:px-60 xl:px-80 py-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter the title of your blog"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className="border border-gray-300 p-3 rounded w-full"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="short-description"
            className="block text-lg font-semibold mb-2"
          >
            Short Description
          </label>
          <input
            id="short-description"
            type="text"
            placeholder="Enter a brief description"
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
            className="border border-gray-300 p-3 rounded w-full"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-lg font-semibold mb-2">
            Content
          </label>
          <Editor value={content} onChange={setContent} />
        </div>

        <div className="mb-6">
          <label htmlFor="file" className="block text-lg font-semibold mb-2">
            Upload New Banner Image
          </label>
          <input
            id="file"
            type="file"
            onChange={(ev) => setFiles(ev.target.files[0])}
            className="border border-gray-300 p-3 rounded w-full"
          />
        </div>
        <div className="flex ">
          <div className="mb-6 flex items-center mr-6">
            <input
              id="is-published"
              type="checkbox"
              checked={isPublished}
              onChange={(ev) => setIsPublished(ev.target.checked)}
              className="mr-2"
            />
            <label htmlFor="is-published" className="text-lg font-semibold">
              Publish
            </label>
          </div>

          <div className="mb-6 flex items-center">
            <input
              id="premium"
              type="checkbox"
              checked={premium}
              onChange={(ev) => setPremium(ev.target.checked)}
              className="mr-2"
            />
            <label htmlFor="premium" className="text-lg font-semibold">
              Premium
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={`mt-4 py-2 px-4 rounded ${
            isSubmitting ? "bg-gray-400" : "bg-blue-500"
          } text-white`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter, useParams } from "next/navigation";
// import "react-quill/dist/quill.snow.css";
// import Editor from "@/components/Editor";
// import { getBlogDetail } from "@/utils/actions";

// export default function EditBlogPage() {
//   const { slug } = useParams();
//   const { data: session } = useSession();
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [content, setContent] = useState("");
//   const [files, setFiles] = useState(null);
//   const [isPublished, setIsPublished] = useState(false);
//   const [premium, setPremium] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);

//   function toggleSidebar() {
//     setIsSidebarVisible((prevState) => !prevState);
//   }

//   useEffect(() => {
//     const fetchBlogData = async () => {
//       const blog = await getBlogDetail(slug, session?.user?.token);

//       if (blog) {
//         setTitle(blog.data.title);
//         setSummary(blog.data.short_description);
//         setContent(blog.data.description);
//         setIsPublished(blog.data.is_published);
//         setPremium(blog.data.premium);
//       }
//     };

//     if (slug && session?.user?.token) {
//       fetchBlogData();
//     }
//   }, [slug, session?.user?.token]);

//   async function handleSubmit(ev) {
//     ev.preventDefault();
//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.set("title", title);
//     formData.set("short_description", summary);
//     formData.set("description", content);
//     formData.set("is_published", isPublished);
//     formData.set("premium", premium);

//     if (files) {
//       formData.set("image", files);
//     }

//     try {
//       const response = await fetch(
//         `https://blogs-23vc.onrender.com/blogs/${slug}`,
//         {
//           method: "PUT",
//           body: formData,
//           headers: {
//             Authorization: `Bearer ${session?.user?.token}`,
//           },
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         router.push("/");
//       } else {
//         console.error("Update failed:", result.error);
//       }
//     } catch (error) {
//       console.error("An error occurred while updating the blog:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="flex flex-col lg:flex-row">
//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarVisible ? "lg:w-1/4" : "lg:w-0"
//         } transform transition-all duration-300 ease-in-out bg-gray-100 p-4 border border-gray-300 lg:block mt-16 min-w-80 ${
//           isSidebarVisible ? "block" : "hidden"
//         }`}
//       >
//         <h2 className="text-xl font-bold mb-12">Images</h2>
//         <div className="mb-6">
//           <label htmlFor="file" className="block text-lg font-semibold mb-2">
//             Upload New Banner Image
//           </label>
//           <input
//             id="file"
//             type="file"
//             onChange={(ev) => setFiles(ev.target.files[0])}
//             className="border border-gray-300 p-3 rounded w-full"
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="file" className="block text-lg font-semibold mb-2">
//             Upload Feautured Image
//           </label>
//           <input
//             type="file"
//             className="border border-gray-300 p-3 rounded w-full"
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="file" className="block text-lg font-semibold mb-2">
//             Upload Thumbnail Image
//           </label>
//           <input
//             type="file"
//             className="border border-gray-300 p-3 rounded w-full"
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="file" className="block text-lg font-semibold mb-2">
//             Add Alt Texts
//           </label>
//           <input
//             placeholder="alt text"
//             className="border border-gray-300 p-3 rounded w-full"
//           />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow lg:px-10 py-20">
//         <button
//           onClick={toggleSidebar}
//           className="lg:hidden mb-4 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           {isSidebarVisible ? "Hide Images Sidebar" : "Show Images Sidebar"}
//         </button>

//         <h1 className="text-3xl font-bold mb-8 text-center">Edit Blog</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label htmlFor="title" className="block text-lg font-semibold mb-2">
//               Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               placeholder="Enter the title of your blog"
//               value={title}
//               onChange={(ev) => setTitle(ev.target.value)}
//               className="border border-gray-300 p-3 rounded w-full"
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="short-description"
//               className="block text-lg font-semibold mb-2"
//             >
//               Short Description
//             </label>
//             <input
//               id="short-description"
//               type="text"
//               placeholder="Enter a brief description"
//               value={summary}
//               onChange={(ev) => setSummary(ev.target.value)}
//               className="border border-gray-300 p-3 rounded w-full"
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="content"
//               className="block text-lg font-semibold mb-2"
//             >
//               Content
//             </label>
//             <Editor value={content} onChange={setContent} />
//           </div>

//           <div className="flex">
//             <div className="mb-6 flex items-center mr-6">
//               <input
//                 id="is-published"
//                 type="checkbox"
//                 checked={isPublished}
//                 onChange={(ev) => setIsPublished(ev.target.checked)}
//                 className="mr-2"
//               />
//               <label htmlFor="is-published" className="text-lg font-semibold">
//                 Publish
//               </label>
//             </div>

//             <div className="mb-6 flex items-center">
//               <input
//                 id="premium"
//                 type="checkbox"
//                 checked={premium}
//                 onChange={(ev) => setPremium(ev.target.checked)}
//                 className="mr-2"
//               />
//               <label htmlFor="premium" className="text-lg font-semibold">
//                 Premium
//               </label>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className={`mt-4 py-2 px-4 rounded ${
//               isSubmitting
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-500 hover:bg-blue-600"
//             } text-white font-bold w-[20%] transition duration-300 ease-in-out transform hover:scale-105`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Updating..." : "Update Blog"}
//           </button>
//         </form>
//       </div>

//       {/* Toggle Sidebar Button for Large Screens */}
//       {!isSidebarVisible && (
//         <button
//           onClick={toggleSidebar}
//           className="hidden lg:block fixed top-1/2 right-0 bg-blue-500 text-white px-4 py-2 rounded"
//           style={{ transform: "translateY(-50%)" }}
//         >
//           Show Images Sidebar
//         </button>
//       )}
//     </div>
//   );
// }
