import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SingleBlog from "@/components/SingleBlog";
import { getBlogDetail } from "@/utils/actions";
import { redirect } from "next/navigation"; // Import redirect function

const SingleBlogPage = async ({ params }) => {
  const { slug } = params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.token) {
    redirect("/signin");
  }

  const token = session.user.token;
  const blog = await getBlogDetail(slug, token);

  return <SingleBlog blog={blog} />;
};

export default SingleBlogPage;

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import SingleBlog from "@/components/SingleBlog";
// import { getBlogDetail } from "@/utils/actions";

// const SingleBlogPage = async ({ params }) => {
//   const { slug } = params;
//   const session = await getServerSession(authOptions);
//   const token = session.user.token;
//   const blog = await getBlogDetail(slug, token);
//   return <SingleBlog blog={blog} />;
// };

// export default SingleBlogPage;
