"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import Editor from "@/components/Editor";
import { createNewPost } from "@/utils/actions";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [premium, setPremium] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { data: session } = useSession();

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!summary.trim()) newErrors.summary = "Short description is required.";
    if (!content.trim()) newErrors.content = "Content is required.";
    if (!files) newErrors.files = "Banner image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const postData = {
      title,
      summary,
      content,
      isPublished,
      premium,
      files,
    };

    const result = await createNewPost(postData, session?.user?.token);

    if (result.success) {
      router.push("/");
    } else {
      console.error("Submission failed:", result.error);
    }

    setIsSubmitting(false);
  }

  return (
    <div className="px-3 md:px-24 lg:px-60 xl:px-80 py-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Blog</h1>
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
            className={`border p-3 rounded w-full ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
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
            className={`border p-3 rounded w-full ${
              errors.summary ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.summary && (
            <p className="text-red-500 text-sm">{errors.summary}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-lg font-semibold mb-2">
            Content
          </label>
          <Editor value={content} onChange={setContent} />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="file" className="block text-lg font-semibold mb-2">
            Upload Banner Image
          </label>
          <input
            id="file"
            type="file"
            onChange={(ev) => setFiles(ev.target.files[0])}
            className={`border p-3 rounded w-full ${
              errors.files ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.files && (
            <p className="text-red-500 text-sm">{errors.files}</p>
          )}
        </div>
        <div className="flex">
          <div className="mb-6 flex items-center mr-4">
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
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold w-[20%] transition duration-300 ease-in-out transform hover:scale-105`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import "react-quill/dist/quill.snow.css";
// import Editor from "@/components/Editor";
// import { createNewPost } from "@/utils/actions";

// export default function CreatePost() {
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [sections, setSections] = useState([{ content: "" }]);
//   const [files, setFiles] = useState(null);
//   const [isPublished, setIsPublished] = useState(false);
//   const [premium, setPremium] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
//   const router = useRouter();
//   const { data: session } = useSession();

//   const validateForm = () => {
//     const newErrors = {};

//     if (!title.trim()) newErrors.title = "Title is required.";
//     if (!summary.trim()) newErrors.summary = "Short description is required.";
//     if (sections.some((section) => !section.content.trim()))
//       newErrors.content = "All content sections are required.";
//     if (!files) newErrors.files = "Banner image is required.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSectionChange = (index, value) => {
//     const updatedSections = sections.map((section, i) =>
//       i === index ? { ...section, content: value } : section
//     );
//     setSections(updatedSections);
//   };

//   const handleAddSection = () => {
//     setSections([...sections, { content: "" }]);
//   };

//   const handleRemoveSection = (index) => {
//     const updatedSections = sections.filter((_, i) => i !== index);
//     setSections(updatedSections);
//   };

//   async function handleSubmit(ev) {
//     ev.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     const postData = {
//       title,
//       summary,
//       sections,
//       isPublished,
//       premium,
//       files,
//     };

//     const result = await createNewPost(postData, session?.user?.token);

//     if (result.success) {
//       router.push("/");
//     } else {
//       console.error("Submission failed:", result.error);
//     }

//     setIsSubmitting(false);
//   }

//   return (
//     <div className="px-3 md:px-24 lg:px-60 xl:px-80 py-20 font-sans">
//       <h1 className="text-3xl font-bold mb-8 text-center">Create Blog</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label htmlFor="title" className="block text-lg font-semibold mb-2">
//             Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             placeholder="Enter the title of your blog"
//             value={title}
//             onChange={(ev) => setTitle(ev.target.value)}
//             className={`border p-3 rounded w-full ${
//               errors.title ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm">{errors.title}</p>
//           )}
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="short-description"
//             className="block text-lg font-semibold mb-2"
//           >
//             Top Description
//           </label>
//           <textarea
//             id="short-description"
//             type="text"
//             placeholder="Enter a brief description"
//             value={summary}
//             onChange={(ev) => setSummary(ev.target.value)}
//             className={`border p-3 rounded w-full h-32 ${
//               errors.summary ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.summary && (
//             <p className="text-red-500 text-sm">{errors.summary}</p>
//           )}
//         </div>

//         {sections.map((section, index) => (
//           <div key={index} className="mb-6">
//             <label
//               htmlFor={`content-${index}`}
//               className="block text-lg font-semibold mb-2"
//             >
//               Content - Section {index + 1}
//             </label>
//             <Editor
//               value={section.content}
//               onChange={(value) => handleSectionChange(index, value)}
//             />
//             {errors.content && (
//               <p className="text-red-500 text-sm">{errors.content}</p>
//             )}
//             <button
//               type="button"
//               onClick={() => handleRemoveSection(index)}
//               className="mt-2 text-red-600 hover:text-red-800"
//             >
//               Remove Section
//             </button>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={handleAddSection}
//           className="mb-6 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition duration-300 ease-in-out"
//         >
//           Add Section
//         </button>

//         <div className="mb-6">
//           <label
//             htmlFor="short-description"
//             className="block text-lg font-semibold mb-2"
//           >
//             Bottom Description
//           </label>
//           <textarea
//             id="short-description"
//             type="text"
//             placeholder="Enter a brief description"
//             value={summary}
//             className={`border p-3 rounded w-full h-32 ${
//               errors.summary ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="file" className="block text-lg font-semibold mb-2">
//             Upload Banner Image
//           </label>
//           <input
//             id="file"
//             type="file"
//             onChange={(ev) => setFiles(ev.target.files[0])}
//             className={`border p-3 rounded w-full ${
//               errors.files ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.files && (
//             <p className="text-red-500 text-sm">{errors.files}</p>
//           )}
//         </div>

//         <div className="flex">
//           <div className="mb-6 flex items-center mr-4">
//             <input
//               id="is-published"
//               type="checkbox"
//               checked={isPublished}
//               onChange={(ev) => setIsPublished(ev.target.checked)}
//               className="mr-2"
//             />
//             <label htmlFor="is-published" className="text-lg font-semibold">
//               Publish
//             </label>
//           </div>
//           <div className="mb-6 flex items-center">
//             <input
//               id="premium"
//               type="checkbox"
//               checked={premium}
//               onChange={(ev) => setPremium(ev.target.checked)}
//               className="mr-2"
//             />
//             <label htmlFor="premium" className="text-lg font-semibold">
//               Premium
//             </label>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className={`mt-4 py-2 px-4 rounded ${
//             isSubmitting
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600"
//           } text-white font-bold  w-[40%] transition duration-300 ease-in-out transform hover:scale-105`}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Submitting..." : "Create Blog"}
//         </button>
//       </form>
//     </div>
//   );
// }
