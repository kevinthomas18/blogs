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

  // console.log(banners[0].banner.path);
  // console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  console.log(banners);

  const images = [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
  ];

  return (
    <div className="w-full h-[80dvh] relative mx-auto rounded-sm max-md:rounded-none overflow-hidden shadow-sm shadow-black mb-[5%]">
      <Slider
      draggable
      fade
        {...settings}
        prevArrow={<IoIosArrowDropleftCircle className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10" size={50} />}
        nextArrow={<IoIosArrowDroprightCircle className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10" size={50} />}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="relative ">
            <div className="w-full h-[80dvh] max-md:h-[50dvh]  ">
              <Link href={`/resources/${banner.id}-${banner.slug}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${banner?.banner?.path}`}
                  alt={`Slide ${banner.title}`}
                  layout="fill"
                  
                  className="rounded-sm max-md:rounded-none"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                  <h2 className="text-xl max-md:text-sm font-bold">{banner.title}</h2>
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
