import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { format } from "date-fns";
import { getServerSession } from "next-auth";

const page = async ({ params }) => {
  let data = {};
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

  const trendingThreads = featuredThreads;

  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/api/forum/${params.slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 10 },
      }
    );
    data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch forums:", error);
    throw error;
  }

  const session = await getServerSession(authOptions);

  const isAuthor = data.data.author === session.user.id;

  return (
    <div className="flex justify-between bg-transparent px-12  mt-16">
      {/* Main Content */}
      <div className="relative w-full lg:w-3/4 p-6 border border-gray-200 rounded-lg">
        <div className="absolute top-8 right-8 text-gray-500 text-sm">
          {format(new Date(data?.data.createdAt), "PPP p")}
          {isAuthor && (
            <div className="mt-2 space-x-4 flex justify-end">
              <button className="text-gray-500 hover:underline">Edit</button>
              <button className="text-gray-500 hover:underline">Delete</button>
            </div>
          )}
        </div>
        <div className="flex items-center mb-4">
          <img
            src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Clipart.png"
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
          <h4 className="capitalize text-lg font-semibold">
            {data?.data.forum_user.name}
          </h4>
        </div>
        <h2 className="text-2xl font-bold mb-4">{data?.data.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: data?.data.description }}></div>
        <button className="px-4 py-2 mt-10 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
          Post reply
        </button>
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
  );
};

export default page;
