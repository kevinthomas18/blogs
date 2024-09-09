"use client";

import { fetchAllBlogs } from "@/utils/actions";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BlogCard from "./BlogCard";

let page = 2;

const LoadMore = () => {
  const { ref, inView } = useInView();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (inView) {
      fetchAllBlogs(page).then((res) => {
        setData([...data, ...res.data]);
        page++;
      });
    }
  }, [inView, data]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-5">
        {data?.map((blog) => (
          <BlogCard
            key={blog.id}
            blogId={blog.id}
            title={blog.title}
            shortDescription={
              blog.top_description == null
                ? blog.short_description
                : blog.top_description
            }
            publish_date={blog.publish_date}
            bannerImage={`https://blogs-23vc.onrender.com${blog.banner?.path}`}
          />
        ))}
      </div>
      <div className="flex justify-center items-center h-full mb-5 mt-3">
        <div
          ref={ref}
          className="h-12 w-12"
          //className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-solid  border-opacity-25"
        ></div>
      </div>
    </>
  );
};

export default LoadMore;
