"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import dynamic from "next/dynamic";
import { useUser } from "@/components/UserContext";
import { toast } from "react-toastify";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const DiscussionForum = ({ forums }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const user = useUser();
  const router = useRouter();

  console.log(forums);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewThreadTitle("");
    setNewThreadContent("");
  };

  const handleCreateThread = async () => {
    try {
      const response = await fetch(
        "https://blogs-23vc.onrender.com/api/forum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.user.token}`,
          },
          body: JSON.stringify({
            title: newThreadTitle,
            description: newThreadContent,
          }),
        }
      );
      const data = await response.json();
      console.log("Thread created:", data);
      if (!data?.err) {
        toast.success("Thread created");
        closeModal();
      } else {
        toast.error(data.err);
      }
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };
  // Dummy data for topics
  const topics = [
    {
      id: 1,
      title:
        "What are the benefits of using chatbots in customer service and marketing in the UAE?",
      author: "Admin",
      time: "1 month ago",
      replies: 4,
      views: 58,
    },
    {
      id: 2,
      title:
        "How can I use data analytics to improve my digital marketing strategy in the UAE?",
      author: "Admin",
      time: "1 month ago",
      replies: 4,
      views: 69,
    },
    {
      id: 3,
      title: "The role of social media influencers in the UAE market",
      author: "Admin",
      time: "3 weeks ago",
      replies: 7,
      views: 85,
    },
    {
      id: 4,
      title: "SEO best practices for e-commerce websites in the UAE",
      author: "Admin",
      time: "2 weeks ago",
      replies: 5,
      views: 102,
    },
    {
      id: 5,
      title: "Email marketing strategies that work in the Middle East",
      author: "Admin",
      time: "5 days ago",
      replies: 3,
      views: 47,
    },
  ];

  // Dummy data for featured and trending threads
  const featuredThreads = [
    {
      id: 1,
      title:
        "How does ChatGPT-generated content affect SEO and ranking of websites?",
      author: "Admin",
      replies: 9,
    },
    {
      id: 2,
      title: "Facebook or Instagram - which is better for marketing in Dubai?",
      author: "Admin",
      replies: 18,
    },
    {
      id: 3,
      title: "Top 10 tips for improving your website's conversion rate",
      author: "Admin",
      replies: 12,
    },
  ];

  const trendingThreads = featuredThreads; // Reuse the same data for now

  return (
    <>
      <div className="container mx-auto px-4 md:px-14 mt-14">
        <h1 className="text-3xl font-bold my-6">Discussion Forum</h1>
        <button
          onClick={openModal}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Thread
        </button>
        <div className="flex flex-col lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
            {/* Topic List */}
            <ul>
              {forums?.data.map((topic) => (
                <li
                  key={topic.id}
                  className="border-b py-4 flex items-center"
                  onClick={() => router.push(`/discuss-forum/${topic.id}`)}
                >
                  <img
                    src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Clipart.png"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline text-lg"
                    >
                      {topic.title}
                    </a>
                    <div className="text-sm text-gray-500 capitalize">
                      by {topic.forum_user.name} ·{" "}
                      {formatDistanceToNowStrict(new Date(topic.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-gray-700">
                      {topic?.replies.length} Replies
                    </div>
                    {/* <div className="text-gray-500">{topic.views} Views</div> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:w-1/4 lg:pl-14 mt-8 lg:mt-0">
            {/* Featured Threads */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Featured Threads</h2>
              <ul>
                {featuredThreads.map((thread) => (
                  <li key={thread.id} className="mb-4">
                    <a href="#" className="text-gray-600 hover:underline">
                      {thread.title}
                    </a>
                    <div className="text-sm text-gray-500">
                      by {thread.author} · {thread.replies} Replies
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trending Threads */}
            <div>
              <h2 className="text-xl font-bold mb-4">Trending Threads</h2>
              <ul>
                {trendingThreads.map((thread) => (
                  <li key={thread.id} className="mb-4">
                    <a href="#" className="text-gray-600 hover:underline">
                      {thread.title}
                    </a>
                    <div className="text-sm text-gray-500">
                      by {thread.author} · {thread.replies} Replies
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mb-4 flex justify-center absolute bottom-7 left-20">
        <nav className="inline-flex -space-x-px">
          <button className="py-2 px-3 text-gray-500 bg-white rounded-l-md border border-gray-300 hover:bg-gray-100">
            Previous
          </button>
          {[...Array(10)].map((_, i) => (
            <button
              key={i}
              className={`py-2 px-3 ${
                i === 0 ? "bg-blue-500 text-white" : "bg-white text-gray-500"
              } border border-gray-300 hover:bg-gray-100`}
            >
              {i + 1}
            </button>
          ))}
          <button className="py-2 px-3 text-gray-500 bg-white rounded-r-md border border-gray-300 hover:bg-gray-100">
            Next
          </button>
        </nav>
      </div>

      {/* Modal for creating a new thread */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleCreateThread}
        title="Create a New Thread"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            value={newThreadTitle}
            onChange={(e) => setNewThreadTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter thread title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Write Thread
          </label>
          <Editor
            value={newThreadContent}
            onChange={setNewThreadContent} // Updates the parent state
          />
        </div>
      </Modal>
    </>
  );
};

export default DiscussionForum;
