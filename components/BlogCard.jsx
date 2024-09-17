"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const BlogCard = ({
  blogId,
  title,
  shortDescription,
  bannerImage,
  publish_date,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blogs/${blogId}`);
  };
  //console.log(bannerImage);
  if (bannerImage === "https://blogs-23vc.onrender.comundefined") {
    bannerImage =
      "https://liftlearning.com/wp-content/uploads/2020/09/default-image.png";
  }
  return (
    <div
      className="border border-grey-400 rounded-lg cursor-pointer relative"
      onClick={handleClick}
    >
      <div>
        <img
          src={bannerImage}
          className="w-full h-48 object-cover rounded-t-lg"
          alt="blog-image"
          width={50}
          height={50}
        />
      </div>
      <div className="px-8 py-5 mb-3">
        <h4 className="text-[#ED4F2C] text-sm pb-4">{title}</h4>
        <h3 className="text-[#0D1422] text-2xl pb-3">
          {shortDescription.slice(0, 90)}....
        </h3>
      </div>
      <div className="flex items-center px-8 py-5 text-xs font-extralight absolute bottom-0 right-0 ">
        <p className="mr-3">2 Min Read</p>
        <p>{publish_date}</p>
      </div>
    </div>
  );
};

export default BlogCard;
