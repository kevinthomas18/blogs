"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import Link from "next/link";
import Image from "next/image";

function ImageSlider({ banners }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  console.log(banners[0].banner.path);
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  const images = [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
  ];

  return (
    <div className="w-full h-[80dvh] relative mx-auto mb-[5%]">
      <Slider
        {...settings}
        // prevArrow={ <IoIosArrowDropleftCircle size={50}  color="black" title="Arrow Left Icon"/>}
        // nextArrow={<IoIosArrowDroprightCircle color="black" size={50} title="Arrow Right Icon" />}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="relative rounded-xl overflow-hidden">
            <div className="w-full h-[80dvh]  ">
              <Link href={`/blogs/${banner.id}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${banner?.banner?.path}`}
                  alt={`Slide ${banner.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                  <h2 className="text-xl font-bold">{banner.title}</h2>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
