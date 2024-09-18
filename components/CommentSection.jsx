import React, { useState } from "react";
import { useUser } from "@/components/UserContext";
import { formatDistanceToNow } from "date-fns";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { CiHeart } from "react-icons/ci";
import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import {
  createComment,
  createLikeComment,
  removeLikeComment,
} from "@/utils/actions";

const CommentSection = ({ params, blog }) => {
  const user = useUser();
  const [comment, setComment] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState("");
  const [comments, setComments] = useState(blog?.data.comments);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleLike = async (id, blogId, token = user.user.token) => {
    try {
      const response = await createLikeComment(id, blogId, token);

      if (response) {
        toast("Liked comment", {
          hideProgressBar: true,
          position: "bottom-right",
        });
        return { success: true };
      } else {
        toast.error("Something went wrong", {
          hideProgressBar: true,
          position: "bottom-right",
        });
      }
    } catch (error) {
      return {
        success: false,
        error: "Error during submission: " + error.message,
      };
    }
  };

  const handleUnlike = async (id, blogId, likeId, token = user.user.token) => {
    try {
      const response = await removeLikeComment(id, blogId, likeId, token);

      if (response) {
        toast("Unliked comment", {
          hideProgressBar: true,
          position: "bottom-right",
        });
        return { success: true };
      } else {
        toast.error("Something went wrong", {
          hideProgressBar: true,
          position: "bottom-right",
        });
        console.log("not ok");
      }
    } catch (error) {
      return {
        success: false,
        error: "Error during submission: " + error.message,
      };
    }
  };

  const handleCommentDelete = async (blogId, commentId) => {
    try {
      const response = await fetch(
        `https://blogs-23vc.onrender.com/blogs/${blogId}/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      );

      if (response.ok) {
        toast("Comment deleted successfully!", {
          hideProgressBar: true,
          position: "bottom-right",
        });
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        ); // Update comments state
      } else {
        console.log("not ok");
      }
    } catch (error) {
      console.error("Error during submission:", error.message);
    }
  };

  const handleCreateComment = async () => {
    if (!user?.user?.token) {
      toast.error("Please log in to comment", {
        hideProgressBar: true,
        position: "bottom-right",
      });
      return;
    }

    if (!comment.trim()) return;

    const { success, data, error } = await createComment(
      params.slug,
      comment,
      user.user.token
    );

    if (success) {
      toast("Comment added", {
        hideProgressBar: true,
        position: "bottom-right",
      });

      setComment("");
      setComments((prevComments) => [...prevComments, data.comment]); // Assuming `data.comment` contains the new comment
    } else {
      toast.error(error || "Failed to add comment", {
        hideProgressBar: true,
        position: "bottom-right",
      });
    }
  };

  const userId = user?.user?.id;

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
            onClick={handleCreateComment}
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
      <div>
        {comments?.map((comment) => {
          // Validate the createdAt field
          const timeAgo = comment?.createdAt
            ? formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })
            : "Just now";

          // Check if the current user has liked this comment
          const isLiked = comment?.likes.some(
            (like) => like.user_id === userId
          );

          const likeId = comment?.likes?.find(
            (like) => like.user_id == user?.user?.id
          )?.id;

          return (
            <div className="mt-6 ml-7" key={comment?.id}>
              <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg">
                {/* Avatar with First Letter */}
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full capitalize"
                  style={{
                    backgroundColor: "blue",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  {comment?.commented_by?.name.charAt(0)}
                </div>

                <div className="flex-1 relative">
                  <p className="text-gray-800 font-semibold capitalize">
                    {comment?.commented_by?.name}
                  </p>
                  <p className="text-gray-600 text-sm">{comment?.comment}</p>
                  <div className="flex space-x-4 text-gray-500 text-sm mt-2 items-center">
                    {isLiked ? (
                      <button
                        onClick={() =>
                          handleUnlike(comment.id, blog.data.id, likeId)
                        }
                        className="relative group"
                      >
                        <AiOutlineDislike className="text-xl" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
                          Unlike
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleLike(comment.id, blog.id)}
                        className="relative group"
                      >
                        <CiHeart className="text-xl" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
                          Like
                        </span>
                      </button>
                    )}
                    {/* Display likes count only if there are 1 or more likes */}
                    {comment?.likes?.length > 0 && (
                      <span className="text-red-500 flex justify-center items-center">
                        <CiHeart className="text-xl mr-1" />{" "}
                        {comment.likes.length}
                      </span>
                    )}
                    <button
                      onClick={handleReplyClick}
                      className="relative group"
                    >
                      Reply
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
                        Reply
                      </span>
                    </button>
                    {comment?.user_id === userId && (
                      <div className="absolute bottom-3 right-3">
                        <button
                          onClick={() =>
                            handleCommentDelete(blog.data.id, comment.id)
                          }
                          className="relative group"
                        >
                          <MdDeleteOutline className="text-xl" />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
                            Delete
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                  {showReplyInput && (
                    <div className="mt-4">
                      <textarea
                        className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Write a reply..."
                        value={reply}
                        onChange={handleReplyChange}
                      ></textarea>
                      <button
                        onClick={() => {
                          // Handle reply logic
                          setReply("");
                          setShowReplyInput(false);
                        }}
                        className="bg-indigo-600 text-white px-4 py-2 mt-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                      >
                        Post Reply
                      </button>
                    </div>
                  )}
                  <p className="text-gray-400 text-xs mt-1">{timeAgo}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
