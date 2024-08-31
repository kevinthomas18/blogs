import React, { useState } from "react";
import { useUser } from "@/components/UserContext";
import { formatDistanceToNow } from "date-fns";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { CiHeart } from "react-icons/ci";
import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

const CommentSection = ({ params, blog }) => {
  const user = useUser();
  const [comment, setComment] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState("");
  const [comments, setComments] = useState(blog.data.comments);
  // Local state for comments

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleLike = async (id, blogId) => {
    try {
      const response = await fetch(
        `https://blogs-23vc.onrender.com/blogs/${blogId}/comment/${id}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
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
        console.log("not ok");
      }
    } catch (error) {
      return {
        success: false,
        error: "Error during submission: " + error.message,
      };
    }
  };

  const handleUnlike = async (id, blogId, likeId) => {
    try {
      const response = await fetch(
        `https://blogs-23vc.onrender.com/blogs/${blogId}/comment/${id}/like/${likeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
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

      if (response.ok) {
        toast("Comment added", {
          hideProgressBar: true,
          position: "bottom-right",
        });

        setComment("");
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error:", error.message);
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
      <div>
        {comments.map((comment) => {
          // Validate the createdAt field
          const timeAgo = comment.createdAt
            ? formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })
            : "Just now";

          // Check if the current user has liked this comment
          const isLiked = comment.likes.some((like) => like.user_id === userId);

          const likeId = comment.likes?.find(
            (like) => like.user_id == user?.user?.id
          )?.id;

          console.log(likeId);

          return (
            <div className="mt-6 ml-7" key={comment.id}>
              <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg">
                {/* Avatar with First Letter */}
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full capitalize"
                  style={{
                    backgroundColor: "blue", // Function to generate a background color
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
                  <p className="text-gray-600 text-sm">{comment.comment}</p>
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
                        <AiOutlineLike className="text-xl" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
                          Like
                        </span>
                      </button>
                    )}

                    {/* Display likes count only if there are 1 or more likes */}
                    {comment.likes?.length > 0 && (
                      <span className="text-red-500 flex justify-center items-center">
                        <CiHeart className="text-xl mr-1" />{" "}
                        {comment.likes.length}
                      </span>
                    )}
                    <button
                      className="hover:text-indigo-600"
                      onClick={handleReplyClick}
                    >
                      Reply
                    </button>
                    <span>{timeAgo}</span>
                    {userId === comment.user_id && (
                      <div className="flex absolute right-2">
                        <button className="mr-2 text-lg">
                          <CiEdit />
                        </button>{" "}
                        <button
                          className="text-red-400 text-lg"
                          onClick={() =>
                            handleCommentDelete(blog.data.id, comment.id)
                          }
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    )}
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
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
