"use client";
import SideLinks from "@/components/SideLinks";
import React, { useState } from "react";

const Page = () => {
  // State to store selected file data
  const [bannerFile, setBannerFile] = useState(null);
  const [featuredFile, setFeaturedFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // Handle file selection for banner image
  const handleBannerFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerFile(URL.createObjectURL(file));
    } else {
      setBannerFile(null);
    }
  };

  // Handle file selection for featured image
  const handleFeaturedFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFeaturedFile(URL.createObjectURL(file));
    } else {
      setFeaturedFile(null);
    }
  };

  // Handle file selection for thumbnail image
  const handleThumbnailFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnailFile(URL.createObjectURL(file));
    } else {
      setThumbnailFile(null);
    }
  };

  return (
    <div className="flex">
      <SideLinks />
      <div className="mx-auto my-14 px-12 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Edit Blog Images
        </h2>

        {/* Edit Banner Image */}
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
                onChange={handleBannerFileChange}
              />
              <label
                htmlFor="banner-upload"
                className="inline-block w-full max-w-xs px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-lg cursor-pointer hover:bg-green-600 transition duration-300"
              >
                Choose Banner Image
              </label>
            </label>
          </div>
          {bannerFile && (
            <div className="mt-4 w-full md:w-48 h-32 border border-gray-300 rounded-lg overflow-hidden">
              <img
                src={bannerFile}
                alt="Banner preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Edit Featured Image */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:space-x-8">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2 text-gray-700">
              Featured Image
            </h3>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                id="featured-upload"
                className="hidden"
                onChange={handleFeaturedFileChange}
              />
              <label
                htmlFor="featured-upload"
                className="inline-block w-full max-w-xs px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-lg cursor-pointer hover:bg-green-600 transition duration-300"
              >
                Choose Featured Image
              </label>
            </label>
          </div>
          {featuredFile && (
            <div className="mt-4 w-full md:w-48 h-32 border border-gray-300 rounded-lg overflow-hidden">
              <img
                src={featuredFile}
                alt="Featured preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Edit Thumbnail Image */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:space-x-8">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2 text-gray-700">
              Thumbnail Image
            </h3>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                id="thumbnail-upload"
                className="hidden"
                onChange={handleThumbnailFileChange}
              />
              <label
                htmlFor="thumbnail-upload"
                className="inline-block w-full max-w-xs px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-lg cursor-pointer hover:bg-green-600 transition duration-300"
              >
                Choose Thumbnail Image
              </label>
            </label>
          </div>
          {thumbnailFile && (
            <div className="mt-4 w-full md:w-48 h-32 border border-gray-300 rounded-lg overflow-hidden">
              <img
                src={thumbnailFile}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-20 flex justify-start space-x-4">
          <button className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition duration-300">
            Cancel
          </button>
          <button className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition duration-300">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
