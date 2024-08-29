import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostReply from "@/components/PostReply";
import ThreadEditDelete from "@/components/ThreadEditDelete";
import { format } from "date-fns";
import { getServerSession } from "next-auth";

const page = async ({ params }) => {
  let data = {};

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

    console.log(data.data.replies);

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
    <div className="flex justify-between bg-transparent px-12  mt-16 mb-10">
      {/* Main Content */}
      <div>
        <div className="relative w-full min-w-[400px] lg:w-3/4 p-6 border border-gray-200 rounded-lg ">
          {isAuthor && <ThreadEditDelete params={params} />}
          <div className="absolute top-8 right-8 text-gray-500 text-sm">
            {format(new Date(data?.data.createdAt), "PPP p")}
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
          <div
            dangerouslySetInnerHTML={{ __html: data?.data.description }}
          ></div>
          <PostReply threadId={data.data.id} />
        </div>

        <div>
          {data.data.replies.length ? (
            <h3 className="text-xl font-bold mb-6 mt-10">
              {data.data.replies.length}{" "}
              {data.data.replies.length === 1 ? "Reply" : "Replies"}
            </h3>
          ) : (
            <h3 className="text-xl font-bold mb-6 mt-10">
              No replies to show...
            </h3>
          )}

          <div className="space-y-8">
            {data.data.replies.map((reply) => {
              const initial = reply.repliers.name.charAt(0).toUpperCase();

              return (
                <div
                  key={reply.id}
                  className="p-6 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center mr-4 text-lg font-semibold">
                      {initial}
                    </div>
                    <h4 className="capitalize text-lg font-semibold">
                      {reply.repliers.name}
                    </h4>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    {format(new Date(reply.createdAt), "PPP p")}
                  </div>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: reply.reply }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Sidebar */}
    </div>
  );
};

export default page;
