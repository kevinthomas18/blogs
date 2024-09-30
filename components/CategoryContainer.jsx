import { heading } from "@/app/font";
import Link from "next/link";
import React from "react";

function CategoryContainer({ title, category }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title and Category Description */}
      <div className="mb-12">
        <h1
          className={`text-center text-4xl md:text-5xl font-bold text-gray-800 ${heading.className}`}
        >
          {category.title}
        </h1>
        {category && (
          <div
            dangerouslySetInnerHTML={{ __html: category.description }}
            className="mt-4 text-lg md:text-xl text-gray-600 leading-relaxed mx-auto max-w-4xl"
          ></div>
        )}
      </div>

      {/* Blog Cards Container */}
      {category?.blogs?.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto ">
          {category?.blogs?.map((blog) => (
            <Link
              href={`/blogs/${blog.id}`}
              key={blog.id}
              className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Blog Image */}
              <div className="w-full md:w-1/3 h-48 md:h-auto mx-5">
                {blog.banner?.path ? (
                  <img
                    className="w-full h-full object-cover"
                    src={`https://blogs-23vc.onrender.com${blog.banner.path}`}
                    // src={'https://liftlearning.com/wp-content/uploads/2020/09/default-image.png'}
                    alt={blog.title}
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src="https://liftlearning.com/wp-content/uploads/2020/09/default-image.png" // Placeholder image path
                    alt="Placeholder"
                  />
                )}
              </div>

              {/* Blog Details */}
              <div className="w-full md:w-2/3 p-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {blog.title}
                </h2>
                <p className="mt-4 text-gray-600">
                  {blog.short_description?.slice(0, 100)}...
                </p>
                <p className="mt-2 text-gray-400 text-sm">
                  {new Date(blog.publish_date).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryContainer;
