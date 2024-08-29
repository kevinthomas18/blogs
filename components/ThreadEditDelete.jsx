"use client";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Modal from "./Modal";

const ThreadEditDelete = ({ params }) => {
  const user = useUser();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://blogs-23vc.onrender.com/api/forum/${params.slug}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Post deleted successfully");
        toast("Thread Deleted Successfully", { hideProgressBar: true });
        router.push("/discuss-forum");
      } else {
        throw new Error(`Failed to delete post: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="absolute bottom-2 right-6 flex">
      <button className="text-gray-500 flex mr-3 hover:underline">
        <MdOutlineEdit className="text-xl" />
        Edit
      </button>
      <button
        onClick={openModal}
        className="text-gray-500 flex hover:underline hover:text-red-500"
      >
        <MdDeleteOutline className="text-xl" />
        Delete
      </button>{" "}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this thread?"
      ></Modal>
    </div>
  );
};

export default ThreadEditDelete;
