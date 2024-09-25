import SingleBlog from "@/components/SingleBlog";
import { getBlogDetail, getAllBlogSlugs } from "@/utils/actions";

// Pre-generate static params (like slugs) at build time
export const generateStaticParams = async () => {
  const slugs = await getAllBlogSlugs();

  return slugs.map(({ slug }) => ({
    slug,
  }));
};

const SingleBlogPage = async ({ params }) => {
  const { slug } = params;

  const blog = await getBlogDetail(slug);
  console.log(blog);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return (
  <>
  <SingleBlog blog={blog} />
  </>
)
};

export default SingleBlogPage;

// import SingleBlog from "@/components/SingleBlog";
// import { getBlogDetail, getAllBlogSlugs } from "@/utils/actions";

// // This generates static paths based on the slugs
// export const generateStaticParams = async () => {
//   const slugs = await getAllBlogSlugs();

//   return slugs.map(({ slug }) => ({
//     slug,
//   }));
// };

// const SingleBlogPage = async ({ params }) => {
//   const { slug } = params;

//   const blog = await getBlogDetail(slug);

//   return <SingleBlog blog={blog} />;
// };

// export default SingleBlogPage;

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
