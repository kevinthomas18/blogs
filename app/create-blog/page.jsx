"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { createNewPost } from "@/utils/actions";

// Dynamically import the Editor to avoid issues with SSR (Server-Side Rendering)
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [topDescription, setTopDescription] = useState("");
  const [bottomDescription, setBottomDescription] = useState("");
  const [sections, setSections] = useState([{ heading: "", content: "" }]);
  const [files, setFiles] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [premium, setPremium] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to sign-in page if not authenticated
      router.push("/auth/signin");
    }
  }, [status, router]);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!topDescription.trim())
      newErrors.topDescription = "Top description is required.";
    if (sections.some((section) => !section.heading.trim()))
      newErrors.heading = "All section headings are required.";
    if (sections.some((section) => !section.content.trim()))
      newErrors.content = "All content sections are required.";
    if (!files) newErrors.files = "Banner image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { heading: "", content: "" }]);
  };

  const handleRemoveSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("top_description", topDescription);
    formData.append("bottom_description", bottomDescription);
    formData.append("is_published", isPublished);
    formData.append("premium", premium);
    formData.append("short_description", topDescription); // Assuming this is the same as topDescription
    formData.append("sections", JSON.stringify(sections)); // Convert sections array to JSON string
    if (files) formData.append("image", files);

    try {
      const result = await createNewPost(formData, session?.user?.token);

      if (result.success) {
        router.push("/");
      } else {
        console.error("Submission failed:", result.error);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="px-3 md:px-24 lg:px-60 xl:px-80 py-20 font-sans">
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
            htmlFor="top-description"
            className="block text-lg font-semibold mb-2"
          >
            Top Description
          </label>
          <textarea
            id="top-description"
            placeholder="Enter a brief description"
            value={topDescription}
            onChange={(ev) => setTopDescription(ev.target.value)}
            className={`border p-3 rounded w-full h-32 ${
              errors.topDescription ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.topDescription && (
            <p className="text-red-500 text-sm">{errors.topDescription}</p>
          )}
        </div>

        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <label
              htmlFor={`heading-${index}`}
              className="block text-lg font-semibold mb-2"
            >
              Heading - Section {index + 1}
            </label>
            <input
              id={`heading-${index}`}
              type="text"
              placeholder="Enter the section heading"
              value={section.heading}
              onChange={(ev) =>
                handleSectionChange(index, "heading", ev.target.value)
              }
              className={`border p-3 rounded w-full ${
                errors.heading ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.heading && (
              <p className="text-red-500 text-sm">{errors.heading}</p>
            )}

            <label
              htmlFor={`content-${index}`}
              className="block text-lg font-semibold mb-2 mt-4"
            >
              Content - Section {index + 1}
            </label>
            <Editor
              value={section.content}
              onChange={(value) => handleSectionChange(index, "content", value)}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
            <button
              type="button"
              onClick={() => handleRemoveSection(index)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove Section
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddSection}
          className="mb-6 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition duration-300 ease-in-out"
        >
          Add Section
        </button>

        <div className="mb-6">
          <label
            htmlFor="bottom-description"
            className="block text-lg font-semibold mb-2"
          >
            Bottom Description
          </label>
          <textarea
            id="bottom-description"
            placeholder="Enter a brief description"
            value={bottomDescription}
            onChange={(ev) => setBottomDescription(ev.target.value)}
            className={`border p-3 rounded w-full h-32 ${
              errors.bottomDescription ? "border-red-500" : "border-gray-300"
            }`}
          />
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
          disabled={isSubmitting}
          className={`py-2 px-4 w-[100%] bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition duration-300 ease-in-out transform ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
