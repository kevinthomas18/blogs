import { heading } from '@/app/font'
import React from 'react'
import BlogCard from './BlogCard'
function CategoryContainer({title,category}) {
  return (
    <>
    <h1 className={`text-3xl  text-gray-600 px-5 ${heading.className}`}>{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-5">
        {category?.map((blog) => (
          <BlogCard
            key={blog.id}
            blogId={blog.id}
            title={blog.title}
            shortDescription={
               blog.short_description
            }
            publish_date={blog.publish_date}
            bannerImage={`https://blogs-23vc.onrender.com${blog.banner?.path}`}
          />
        ))}
      </div>
      {/* <LoadMore /> */}
    </>
  )
}

export default CategoryContainer
