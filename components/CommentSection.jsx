import React, { useState } from "react";
import { useUser } from "@/components/UserContext";

const CommentSection = ({ params }) => {
  const user = useUser();
  const [comment, setComment] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const createComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await fetch(
        `https://blogs-23vc.onrender.com/blogs/${params.slug}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.user.token}`,
          },
          body: JSON.stringify({ comment }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log(data.msg); // Comment Created Successfully
        // Optionally clear the comment input or fetch updated comments
        setComment("");
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="mx-auto mt-28">
      {/* Comment Input Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <textarea
          className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Write a response..."
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            onClick={createComment}
            className={`bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ${
              comment.trim().length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={comment.trim().length === 0}
          >
            Post Comment
          </button>
        </div>
      </div>

      {/* Existing Comments Section */}
      <div className="mt-6 ml-7">
        <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>{" "}
          {/* Avatar Placeholder */}
          <div className="flex-1">
            <p className="text-gray-800 font-semibold">John Doe</p>
            <p className="text-gray-600 text-sm">This is a sample comment.</p>
            <div className="flex space-x-4 text-gray-500 text-sm mt-2">
              <button>Like</button>
              <button
                className="hover:text-indigo-600"
                onClick={handleReplyClick}
              >
                Reply
              </button>
              <span>2 hours ago</span>
            </div>
            {/* Reply Input Section */}
            {showReplyInput && (
              <div className="mt-4">
                <textarea
                  className="w-full h-16 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write a reply..."
                  value={reply}
                  onChange={handleReplyChange}
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button
                    className={`bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ${
                      reply.trim().length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={reply.trim().length === 0}
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
