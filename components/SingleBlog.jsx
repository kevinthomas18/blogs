"use client";

import { useUser } from "@/components/UserContext";
import { useParams } from "next/navigation";
import CommentSection from "./CommentSection";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsSave2 } from "react-icons/bs";
import SideLinks from "./SideLinks";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

const SingleBlog = ({ blog }) => {
  const { user } = useUser();
  const params = useParams();
  const isAuthor = user?.id === blog?.data?.author;
  console.log(blog?.data.description);

  // Custom Next Arrow Button
  const NextArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
        onClick={onClick}
      >
        <FaArrowRight size={20} />
      </button>
    );
  };

  // Custom Prev Arrow Button
  const PrevArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
        onClick={onClick}
      >
        <FaArrowLeft size={20} />
      </button>
    );
  };
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    nextArrow: <NextArrow />, // Custom Next Arrow
    prevArrow: <PrevArrow />, // Custom Prev Arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {isAuthor && <SideLinks />}

      <div className="px-3 md:px-14 lg:px-40 xl:px-60 2xl:px-80 py-20 ">
        <div className="flex justify-between items-center  ">
          <div>
            <h1 className="text-2xl font-bold mt-3 mb-10">
              {blog?.data.title}
            </h1>
          </div>
          {/* <div className="relative flex items-center">
            <button className="text-2xl text-red-500 mr-4 relative group">
              <IoMdHeartEmpty />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
                Like
              </span>
            </button>
            <button className="text-2xl text-blue-500 relative group">
              <BsSave2 />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex text-xs bg-gray-700 text-white rounded px-2 py-1">
                Save
              </span>
            </button>
          </div> */}
        </div>
        <img
          src={`https://blogs-23vc.onrender.com${blog?.data?.banner?.path}`}
          alt="banner-image"
        />
        <h2 className=" font-semibold mt-3 mb-10">
          {blog?.data.top_description}
        </h2>

        {blog?.data.sections.map((section) => {
          return (
            <div key={section.heading} className="mt-5">
              <h3 className="font-bold mb-3">{section.heading}</h3>
              <div dangerouslySetInnerHTML={{ __html: section.content }}></div>
            </div>
          );
        })}

        <div
          className="text-lg lg:text-xl leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog?.data.description }}
        ></div>
        <h3 className="font-semibold">{blog?.data.bottom_description}</h3>
        <div className="mt-60">
          {blog?.attachments?.length ? (
            <>
              <h2 className="text-lg font-semibold mb-4">Attachments</h2>
              {blog.attachments.length > 3 ? (
                <Slider {...settings}>
                  {blog.attachments.map((attachment) => (
                    <div key={attachment.path} className="px-2">
                      <img
                        src={`https://blogs-23vc.onrender.com${attachment.path}`}
                        alt="Attachment"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {blog.attachments.map((attachment) => (
                    <img
                      key={attachment.path}
                      src={`https://blogs-23vc.onrender.com${attachment.path}`}
                      alt="Attachment"
                      className="w-full h-64 object-cover"
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <CommentSection params={params} blog={blog} />
      </div>
    </>
  );
};

export default SingleBlog;
