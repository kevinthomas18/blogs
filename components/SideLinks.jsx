import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { MdInsertChartOutlined } from "react-icons/md";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "./UserContext";
import { deleteBlog } from "@/utils/actions";
import { toast } from "react-toastify";
import Modal from "./Modal";

const SideLinks = () => {
  const params = useParams();
  const { user } = useUser();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBlogDelete = async (id, token) => {
    const deleted = await deleteBlog(id, token);
    if (deleted) {
      toast.error("Blog deleted successfully!", { hideProgressBar: true });

      router.replace("/");
    } else {
      console.error("Failed to delete blog");
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleBlogDelete(params.slug, user?.token)}
        title="Confirm Deletion"
      >
        <p className="mb-6">Are you sure you want to delete this blog post?</p>
      </Modal>
      <div className="absolute flex flex-row space-y-2 top-40 left-10 md:flex-col md:space-x-2">
        <Link
          href={`/edit-blog/${params.slug}`}
          className="text-gray-600 hover:text-orange-400 font-semibold flex items-center ml-2"
        >
          <CiEdit className="mx-2 text-xl" />
          Edit
        </Link>
        <button
          className="text-gray-600 hover:text-red-600 font-semibold flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <RiDeleteBin6Line className="mx-2" />
          Delete
        </button>
        <Link
          href={`/edit-blog/edit-images/${params.slug}`}
          className="text-gray-600 hover:text-blue-600 font-semibold flex items-center"
        >
          <FaImages className="mx-2" />
          Images
        </Link>
        <Link
          href={`/edit-blog/add-seo/${params.slug}`}
          className="text-gray-600 hover:text-green-600 font-semibold flex items-center"
        >
          <MdInsertChartOutlined className="mx-2" />
          SEO
        </Link>
      </div>
    </>
  );
};

export default SideLinks;
