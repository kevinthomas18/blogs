import BlogCard from "./BlogCard";
import { fetchAllBlogs } from "@/utils/actions";
import LoadMore from "./LoadMore";
import { heading } from "@/app/font";

const CardsContainer = async ({blogs,title}) => {


  return (
    <>
    <h1 className={`text-3xl  text-gray-600 px-5 ${heading.className}`}>{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-5">
        {blogs?.map((blog) => (
          <BlogCard
            key={blog.id}
            blogId={blog.id}
            title={blog.title}
            slug={blog.slug}
            shortDescription={
               blog.short_description
            }
            publish_date={blog.publish_date}
            bannerImage={ blog.banner?.path!==undefined ? `https://blogs-23vc.onrender.com${blog.banner?.path}`:`https://liftlearning.com/wp-content/uploads/2020/09/default-image.png`}
          />
        ))}
      </div>
      {/* <LoadMore /> */}
    </>
  );
};

export default CardsContainer;
