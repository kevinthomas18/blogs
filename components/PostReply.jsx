"use client";

import { useState } from "react";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useUser } from "./UserContext";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const PostReply = ({ threadId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const user = useUser();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = async () => {
    try {
      const response = await fetch(
        `https://blogs-23vc.onrender.com/api/forum/${threadId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.user.token}`,
          },
          body: JSON.stringify({ reply: replyContent }),
        }
      );

      if (response.ok) {
        toast.success("Reply posted successfully!", {
          position: "bottom-right",
          hideProgressBar: true,
        });
        setReplyContent("");
        closeModal();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to post reply: ${errorData.err}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 mt-10 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Post reply
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleClick}
        title="Write Reply"
      >
        <div className="mb-4">
          <Editor onChange={setReplyContent} value={replyContent} />
        </div>
      </Modal>
    </>
  );
};

export default PostReply;
