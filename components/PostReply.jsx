"use client";

import { useState } from "react";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useUser } from "./UserContext";
import { createReply } from "@/utils/actions";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const PostReply = ({ threadId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const user = useUser();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = async (threadId, token, reply) => {
    const response = await createReply(threadId, token, reply);
    if (response) {
      toast.success("Reply posted successfully!", {
        position: "bottom-right",
        hideProgressBar: true,
      });
      setReplyContent("");
      closeModal();
    } else {
      toast.error("Failed to post reply");
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
        onConfirm={() => handleClick(threadId, user?.user.token, replyContent)}
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
