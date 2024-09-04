"use client";
import { useUser } from "./UserContext";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { deleteReply } from "@/utils/actions";
import { toast } from "react-toastify";

const ReplyEditDelete = ({ replyId, forumId }) => {
  const { user } = useUser();
  const handleDeleteReply = async (forumId, replyId, token) => {
    await deleteReply(forumId, replyId, token);
    toast("reply deleted", { hideProgressBar: true, position: "bottom-right" });
  };
  return (
    <div className="absolute bottom-0 right-0 flex space-x-4">
      <div className="relative group">
        <CiEdit className="mr-1 cursor-pointer" />
        <div className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2">
          Edit
        </div>
      </div>
      <div className="relative group">
        <MdDeleteOutline
          className="cursor-pointer"
          onClick={() => handleDeleteReply(forumId, replyId, user?.token)}
        />
        <div className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2">
          Delete
        </div>
      </div>
    </div>
  );
};

export default ReplyEditDelete;
