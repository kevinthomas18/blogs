import BlogCard from "./BlogCard";
import { fetchAllBlogs } from "@/utils/actions";
import { GiHamburgerMenu } from "react-icons/gi";

const CardsContainer = async () => {
  const blogs = await fetchAllBlogs();

  return (
    <>
      {/* <div className="flex justify-end mx-4 border border-red-400">
        <GiHamburgerMenu className="pointer" />
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-5">
        {blogs?.data?.map((blog) => (
          <BlogCard
            key={blog.id}
            blogId={blog.id}
            title={blog.title}
            shortDescription={blog.short_description}
            publish_date={blog.publish_date}
            bannerImage={`https://blogs-23vc.onrender.com${blog.banner?.path}`}
          />
        ))}
      </div>
    </>
  );
};

export default CardsContainer;
