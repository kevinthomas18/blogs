"use client";
import { getAllBlogSlugs, menu } from "@/utils/actions";
import axios from "axios";
import React from "react";

const page = () => {
  const handleFetch = async () => {
    try {
      const response = await axios.get("/api/proxy");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleGetMenu = () => {
    menu();
  };

  const handleSlug = async () => {
    const data = await getAllBlogSlugs();
    console.log(data);
  };

  return (
    <div className="m-20 flex justify-between w-[400px]">
      <button
        className="capitalize text-2xl border py-3 px-6 border-gray-900 rounded-lg"
        onClick={handleFetch}
      >
        fetch
      </button>
      <button
        className="capitalize text-2xl border py-3 px-6 border-gray-900 rounded-lg"
        onClick={handleGetMenu}
      >
        Menu
      </button>
      <button
        className="capitalize text-2xl border py-3 px-6 border-gray-900 rounded-lg"
        onClick={handleSlug}
      >
        slug
      </button>
    </div>
  );
};

export default page;
