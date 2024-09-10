import SingleBlog from "@/components/SingleBlog";
import { getBlogDetail, getAllBlogSlugs } from "@/utils/actions";

// This generates static paths based on the slugs
export const generateStaticParams = async () => {
  // Fetch all blog slugs
  const slugs = await getAllBlogSlugs();

  // Return an array of params for each slug
  return slugs.map(({ slug }) => ({
    slug,
  }));
};

// Server-side component for fetching blog details based on the slug
const SingleBlogPage = async ({ params }) => {
  const { slug } = params;

  // Fetch blog details using the slug
  const blog = await getBlogDetail(slug);

  // Pass the blog data to the client component
  return <SingleBlog blog={blog} />;
};

export default SingleBlogPage;

// import SingleBlog from "@/components/SingleBlog";
// import { getBlogDetail } from "@/utils/actions";

// const SingleBlogPage = async ({ params }) => {
//   const { slug } = params;
//   //const session = await getServerSession(authOptions);
//   //const token = session?.user?.token;

//   const blog = await getBlogDetail(slug);

//   return <SingleBlog blog={blog} />;
// };

// export default SingleBlogPage;
