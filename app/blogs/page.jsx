import CardsContainer from "@/components/CardsContainer";
import { allBlogs } from "@/utils/actions";
import React from "react";

async function Blogs() {
  const blogs = await allBlogs();
  return (
    <>
      <CardsContainer blogs={blogs.data} title="All Blogs" />
    </>
  );
}

export default Blogs;
