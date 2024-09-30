import SingleBlog from "@/components/SingleBlog";
import CategoryContainer from "@/components/CategoryContainer";
import {
  getBlogDetail,
  getAllBlogSlugs,
  getCategoryBasedBlogs,
} from "@/utils/actions";
import { notFound } from "next/navigation"; // Import Next.js notFound helper

// Pre-generate static params (like slugs) at build time
export const dynamicParams = true;

export const generateStaticParams = async () => {
  const slugs = await getAllBlogSlugs();

  return slugs.map(({ slug }) => ({
    slug,
  }));
};

// Generate metadata for the blog detail page
export const generateMetadata = async ({ params }) => {
  const blog = await getBlogDetail(params.slug);
  return {
    title: blog?.title || "Blog",
    description: blog?.short_description || "Blog post",
  };
};

const SingleBlogPage = async ({ params }) => {
  const { slug } = params;
  console.log({ slug });

  // Handle category pages (category-id-slug)
  if (slug.includes("category-")) {
    const match = slug.match(/category-([a-zA-Z0-9-]+)-(.+)/); // Match category ID and slug
    if (match && match[1]) {
      const categoryId = match[1]; // Extract the category ID
      const categoryBlogs = await getCategoryBasedBlogs(categoryId);

      if (!categoryBlogs) {
        return notFound(); // Trigger the Next.js 404 page if no category found
      }

      return (
        <>
          <CategoryContainer
            category={categoryBlogs.data}
            title="All Categories"
          />
        </>
      );
    }
  }

  // Handle UUID-based pages (UUID-slug)
  const UUIDMatch = slug.match(/^([a-f0-9\-]{36})-(.+)/); // Match UUID and slug
  if (UUIDMatch && UUIDMatch[1]) {
    const uuid = UUIDMatch[1]; // Extract the UUID
    const blog = await getBlogDetail(uuid);

    if (!blog) {
      return notFound(); // Trigger the Next.js 404 page if no blog found
    }

    return (
      <>
        <SingleBlog blog={blog} />
      </>
    );
  }

  // Handle number or string-based pages (id-slug)
  const idMatch = slug.match(/^([a-zA-Z0-9]+)-(.+)/); // Match ID (number or string) and slug
  if (idMatch && idMatch[1]) {
    const id = idMatch[1]; // Extract the ID
    const blog = await getBlogDetail(id);

    if (!blog) {
      return notFound(); // Trigger the Next.js 404 page if no blog found
    }

    return (
      <>
        <SingleBlog blog={blog} />
      </>
    );
  }

  // If no match found for any patterns, trigger a 404 page
  return notFound();
};

export default SingleBlogPage;
