import EditBlog from "@/components/EditBlog";
import { getBlogDetail } from "@/utils/actions";

const EditBlogPage = async ({ params }) => {
  const response = await getBlogDetail(params.slug);
  const blog = response.data;

  return <EditBlog blog={blog} />;
};

export default EditBlogPage;
