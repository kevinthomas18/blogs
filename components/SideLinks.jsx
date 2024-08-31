"use client";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { MdInsertChartOutlined } from "react-icons/md";
import Link from "next/link";

const SideLinks = () => {
  return (
    <div className="absolute flex flex-row space-y-2 top-40 left-10 md:flex-col md:space-x-2">
      <button className="text-gray-600 hover:text-orange-400 font-semibold flex items-center">
        <CiEdit className="mx-2" />
        Edit
      </button>
      <button className="text-gray-600 hover:text-red-600 font-semibold flex items-center">
        <RiDeleteBin6Line className="mx-2" />
        Delete
      </button>
      <Link
        href="edit-images"
        className="text-gray-600 hover:text-blue-600 font-semibold flex items-center"
      >
        <FaImages className="mx-2" />
        Images
      </Link>
      <button className="text-gray-600 hover:text-green-600 font-semibold flex items-center">
        <MdInsertChartOutlined className="mx-2" />
        SEO
      </button>
    </div>
  );
};

export default SideLinks;
