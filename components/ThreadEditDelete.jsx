"use client";
import { useEffect, useState } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import { Changa_One } from "next/font/google";
import { deleteThread } from "@/utils/actions";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const ThreadEditDelete = ({ params, data }) => {
  const user = useUser();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [editorValue, setEditorValue] = useState(data.description);

  const openModal = (content, onConfirm) => {
    setModalContent({ content, onConfirm });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleDelete = async (params, token) => {
    try {
      const response = await deleteThread(params, token);
      if (response) {
        console.log("Post deleted successfully");
        toast("Thread Deleted ", { hideProgressBar: true });
        router.push("/discuss-forum");
      } else {
        throw new Error(`Failed to delete post: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (newValue) => {
    setEditorValue(newValue);
    console.log("New Editor Value:", newValue);
  };

  const handleEdit = () => {
    openModal(
      <div>
        <h2 className="text-xl font-bold mb-4">Edit Your Thread</h2>

        <Editor value={editorValue} onChange={setEditorValue} />
      </div>,
      async () => {
        try {
          console.log("Final Editor Value before update:", editorValue);
          const response = await fetch(
            `https://blogs-23vc.onrender.com/api/forum/${data.id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${user.user.token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ description: editorValue }),
            }
          );
          const datas = await response.json();
          console.log(datas, "data");

          if (response.ok) {
            console.log("Updated Content:", editorValue);
            toast.success("Thread Updated Successfully", {
              hideProgressBar: true,
              position: "bottom-right",
            });
          } else {
            toast.error("Something went wrong", { hideProgressBar: true });
            throw new Error(`Failed to update post: ${response.status}`);
          }
        } catch (error) {
          toast.error("Something went wrong", { hideProgressBar: true });
          console.error("Error updating post:", error);
        }
        closeModal();
      }
    );
  };

  return (
    <div className="absolute bottom-2 right-6 flex">
      <button
        onClick={handleEdit}
        className="text-gray-500 flex mr-3 hover:underline"
      >
        <MdOutlineEdit className="text-xl" />
        Edit
      </button>
      <button
        onClick={() =>
          openModal(
            <div>
              <h2 className="text-xl font-bold mb-4">
                Are you sure you want to delete this thread?
              </h2>
            </div>,
            () => handleDelete(params.slug, user?.user.token)
          )
        }
        className="text-gray-500 flex hover:underline hover:text-red-500"
      >
        <MdDeleteOutline className="text-xl" />
        Delete
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={modalContent?.onConfirm}
        title=""
      >
        {modalContent?.content}
      </Modal>
    </div>
  );
};

export default ThreadEditDelete;
