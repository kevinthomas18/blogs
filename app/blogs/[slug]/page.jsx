import SingleBlog from "@/components/SingleBlog";
import { getBlogDetail } from "@/utils/actions";

const SingleBlogPage = async ({ params }) => {
  const { slug } = params;
  //const session = await getServerSession(authOptions);
  //const token = session?.user?.token;

  const blog = await getBlogDetail(slug);

  return <SingleBlog blog={blog} />;
};

export default SingleBlogPage;
