"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SideLinks from "@/components/SideLinks";

const AddSEO = () => {
  const router = useRouter();

  const [seoData, setSeoData] = useState({
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    metaAuthor: "",
    metaRobots: "",
  });

  const handleChange = (e) => {
    setSeoData({ ...seoData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Implement save logic here, e.g., sending the data to an API
    console.log("SEO Data Saved:", seoData);
  };

  const handleCancel = () => {
    router.back(); // Navigates back to the previous page
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <SideLinks />
      <h2 className="text-2xl font-bold mb-6">Add SEO Information</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="metaTitle"
            className="block text-gray-700 font-semibold mb-2"
          >
            Meta Title
          </label>
          <input
            type="text"
            id="metaTitle"
            name="metaTitle"
            value={seoData.metaTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="metaDescription"
            className="block text-gray-700 font-semibold mb-2"
          >
            Meta Description
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={seoData.metaDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="metaKeywords"
            className="block text-gray-700 font-semibold mb-2"
          >
            Meta Keywords
          </label>
          <input
            type="text"
            id="metaKeywords"
            name="metaKeywords"
            value={seoData.metaKeywords}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="metaAuthor"
            className="block text-gray-700 font-semibold mb-2"
          >
            Meta Author
          </label>
          <input
            type="text"
            id="metaAuthor"
            name="metaAuthor"
            value={seoData.metaAuthor}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="metaRobots"
            className="block text-gray-700 font-semibold mb-2"
          >
            Meta Robots
          </label>
          <input
            type="text"
            id="metaRobots"
            name="metaRobots"
            value={seoData.metaRobots}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSEO;
