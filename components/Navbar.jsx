"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidOffer } from "react-icons/bi";
import { FaPenToSquare } from "react-icons/fa6";
import { GoDiscussionClosed } from "react-icons/go";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex justify-between mr-4 p-5 font-inter">
      <div className="flex items-center mr-4">
        {/* <button className="bg-[#FFEEDF] px-4 py-2 flex items-center mr-8">
          <GiHamburgerMenu className="mr-2" />
          Menu
        </button> */}

        {/* <div className="relative inline-block group">
          <button className="bg-[#FFEEDF] px-4 py-2 flex items-center mr-8">
            <GiHamburgerMenu className="mr-2" />
            Menu
          </button>

          <div className="absolute right-[-10] mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              href="/discuss-forum"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Discuss Forum
            </Link>
          </div>
        </div> */}

        <div className="relative inline-block group">
          <button className="bg-[#FFEEDF] px-4 py-2 flex items-center mr-8">
            <GiHamburgerMenu className="mr-2" />
            Menu
          </button>

          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              href="/discuss-forum"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
            >
              Discuss Forum
            </Link>
            <div className="border-t border-gray-300"></div>
            <Link
              href="/career"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
            >
              Career
            </Link>
          </div>
        </div>

        {/* end */}

        <div className="hidden lg:flex items-center">
          <Link href="/" className="flex items-center mr-10">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="36"
              viewBox="0 0 32 36"
              fill="none"
            >
              <path
                d="M20.4745 26.5574C20.4745 26.5574 21.6591 28.4835 25.656 28.5175H5.90234C9.89932 28.4835 11.0839 26.5574 11.0839 26.5574H20.4753H20.4745Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.9079 20.9773C18.9079 20.9773 20.0925 22.9034 24.0895 22.9374H7.47266C11.4696 22.9034 12.6542 20.9773 12.6542 20.9773H18.9088H18.9079Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.2097 15.3979C18.2097 15.3979 19.3943 17.324 23.3913 17.3581H8.17188C12.1688 17.324 13.3535 15.3979 13.3535 15.3979H18.2105H18.2097Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5114 9.81763C17.5114 9.81763 18.696 11.7437 22.693 11.7777H8.87109C12.8681 11.7437 14.0527 9.81763 14.0527 9.81763H17.5123H17.5114Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.89844 6.19839C13.8954 6.16437 15.7788 4.23828 15.7788 4.23828C15.7788 4.23828 17.6621 6.16437 21.6591 6.19839H9.89931H9.89844Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.7812 4.23826V1.00195"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.3477 15.3978V11.7786"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.1602 15.3978V11.7786"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.6211 20.8655V17.5437"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.8945 20.8655V17.5437"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.1602 26.2302V22.9084"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.3516 26.2302V22.9084"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.43359 34.5323V29.1047"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.0859 34.5323V29.1047"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.0508 9.81774V6.19849"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.4688 9.81774V6.19849"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.1201 34.6857V31.7556C17.1201 31.0037 16.5103 30.3948 15.7593 30.3948C15.0073 30.3948 14.3984 31.0045 14.3984 31.7556V34.6857"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.3516 24.6663V26.2303"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.1602 24.6663V26.2303"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.6445 19.2046V20.6204"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.918 19.2046V20.6204"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.9531 15.0464V13.5879"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6094 15.0464V13.5879"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.7812 8.10791V9.41028"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.7734 3.14258H16.7623"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9062 32.3558V31.4844"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.6133 32.3558V31.4844"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M29.5277 33.3469V34.9982H2.03125V33.3469"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M29.5273 33.3468V28.6389"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28.4961 31.4617H30.5583"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28.8164 30.0154H30.2357"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.03125 33.3468V28.6389"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 31.4617H3.06217"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.32031 30.0154H2.73958"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Blogs
          </Link>
          <Link href="/discuss-forum" className="flex items-center mr-10">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="36"
              viewBox="0 0 65 36"
              fill="none"
            >
              <path
                d="M18.7787 8.38573C20.8936 8.38573 22.6081 6.67123 22.6081 4.55628C22.6081 2.44132 20.8936 0.726807 18.7787 0.726807C16.6637 0.726807 14.9492 2.44132 14.9492 4.55628C14.9492 6.67123 16.6637 8.38573 18.7787 8.38573Z"
                fill="#FF6700"
              />
              <path
                d="M38.588 18.0549C38.588 18.0549 40.0355 16.873 40.0355 14.2437C40.0355 9.51088 32.6082 7.27724 32.6082 5.24146C32.6082 7.27724 25.1836 9.51348 25.1836 14.2437C25.1836 16.873 26.631 18.0549 26.631 18.0549H38.5906H38.588Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M32.6055 1.09961V5.56948"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25.544 16.347H39.6618C40.8463 13.1762 39.1958 10.966 36.556 8.92236H28.6472C26.0152 10.9608 24.3569 13.1684 25.5414 16.347H25.544Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M38.5846 18.0549H26.625V35.2732H38.5846V18.0549Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M38.5846 18.0549H26.625V20.7493H38.5846V18.0549Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M37.2665 22.9177H28.0664V35.273H37.2665V22.9177Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M35.4942 29.9494C35.4942 26.3803 32.5707 25.2114 32.5707 25.2114C32.5707 25.2114 29.7148 26.3803 29.7148 29.9494V35.2732H35.4942V29.9494Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M26.627 22.9177H20.7773V35.273H26.627V22.9177Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.7761 22.9177H17.0977V35.273H20.7761V22.9177Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.0977 22.9178V20.7493"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.7773 22.9178V20.7493"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.9336 29.327V24.8416"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.9336 35.2732V30.8059"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24.7584 25.9063C24.7584 24.9379 23.7067 24.6411 23.7067 24.6411C23.7067 24.6411 22.6523 24.9405 22.6523 25.9063V29.3271H24.7584V25.9063Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24.7584 31.8551C24.7584 30.8866 23.7067 30.5898 23.7067 30.5898C23.7067 30.5898 22.6523 30.8892 22.6523 31.8551V35.2732H24.7584V31.8551Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M44.4356 22.9177H38.5859V35.273H44.4356V22.9177Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M48.1186 22.9177H44.4375V35.273H48.1186V22.9177Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M48.1133 22.9178V20.7493"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M44.4375 22.9178V20.7493"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M46.2812 29.327V24.8416"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M46.2812 35.2732V30.8059"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M40.457 25.9063C40.457 24.9379 41.5114 24.6411 41.5114 24.6411C41.5114 24.6411 42.5657 24.9405 42.5657 25.9063V29.3271H40.4596V25.9063H40.457Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M40.457 31.8551C40.457 30.8866 41.5114 30.5898 41.5114 30.5898C41.5114 30.5898 42.5657 30.8892 42.5657 31.8551V35.2732H40.4596V31.8551H40.457Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.8672 20.1478V19.5022C21.8672 18.1198 23.6999 17.5861 23.6999 16.6646C23.6999 17.5861 25.5353 18.1172 25.5353 19.5022V20.1478H21.8672Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.65104 13.158V12.7649C3.65104 11.9214 4.76786 11.5934 4.76786 11.0337C4.76786 11.596 5.88727 11.9214 5.88727 12.7649V13.158H3.64844H3.65104Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M23.707 16.6647V14.5898"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25.5353 20.1479H21.8672V22.9179H25.5353V20.1479Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M39.5625 20.1478V19.5022C39.5625 18.1198 41.3952 17.5861 41.3952 16.6646C41.3952 17.5861 43.2305 18.1172 43.2305 19.5022V20.1478H39.5625Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M41.3945 16.6647V14.5898"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M43.2305 20.1479H39.5625V22.9179H43.2305V20.1479Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.59227 15.626H5.85974L6.28929 35.2731H3.03516L3.59227 15.626Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.21484 28.8664H6.14617L6.00038 22.1941H3.40488L3.21484 28.8664Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.64453 22.1941H6.84888"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.92188 15.626H6.56911"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.92188 13.158H6.56911"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.64453 28.8665H6.84888"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.89374 13.158H3.52734V15.6259H5.89374V13.158Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.77344 9.80762V11.0364"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M52.8945 18.2136V17.9117C52.8945 17.2608 53.7562 17.0083 53.7562 16.5762C53.7562 17.0083 54.6205 17.2608 54.6205 17.9117V18.2136H52.8945Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M52.8475 20.1167H54.5969L54.9276 35.2732H52.418L52.8475 20.1167Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M52.5508 30.3319H54.8131L54.6985 25.1826H52.6966L52.5508 30.3319Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M52.1055 25.1826H55.3492"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M52.3281 20.1167H55.1423"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M52.3281 18.2136H55.1423"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M52.1055 30.332H55.3492"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M53.7539 15.626V16.5736"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.3594 18.2136V17.9117C10.3594 17.2608 11.2211 17.0083 11.2211 16.5762C11.2211 17.0083 12.0854 17.2608 12.0854 17.9117V18.2136H10.3594Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.3072 20.1167H12.0566L12.3872 35.2732H9.875L10.3072 20.1167Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.0195 30.3319H12.2792L12.1673 25.1826H10.1653L10.0195 30.3319Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.57812 25.1826H12.8218"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.78906 20.1167H12.6032"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.78906 18.2136H12.6032"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.57812 30.332H12.8218"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.2266 15.626V16.5736"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M59.3672 13.158V12.7649C59.3672 11.9214 60.484 11.5934 60.484 11.0337C60.484 11.596 61.6034 11.9214 61.6034 12.7649V13.158H59.3672Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M59.2993 15.626H61.5668L61.9963 35.2731H58.7422L59.2993 15.626Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M58.9219 28.8664H61.8532L61.7074 22.1941H59.1093L58.9219 28.8664Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M58.3438 22.1941H62.5455"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M58.625 15.626H62.2722"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M58.625 13.158H62.2722"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M58.3438 28.8665H62.5455"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M61.6008 13.158H59.2344V15.6259H61.6008V13.158Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M60.4805 9.80762V11.0364"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M61.5621 13.158H60.4141V15.6259H61.5621V13.158Z"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 35.2732H64"
                stroke="#5B5B5B"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Forum
          </Link>
          <Link href="/services" className="flex items-center">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
            >
              <path
                d="M23.1526 15.7693H13.9219V25.9231H23.1526V15.7693Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.7695 20.3847C15.7695 18.8534 17.0102 17.6155 18.5388 17.6155C20.0674 17.6155 21.308 18.8561 21.308 20.3847C21.308 21.9133 20.0674 23.1539 18.5388 23.1539C17.0102 23.1539 15.7695 21.9133 15.7695 20.3847Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.5391 19.4614V21.0538L19.4621 22.2307"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.2323 13H14.8477V15.7692H22.2323V13Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.8477 37V25.9231H22.2323V37"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.8841 12.0769H16.1987L14.8477 13H22.2323L20.8841 12.0769Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.3837 8.38452H16.6914V12.0768H20.3837V8.38452Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.5365 3.76929L20.3837 8.38467H16.6914L18.5365 3.76929Z"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.5391 3.76923V1"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.6172 12.0769V10.2307"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.4609 12.0769V10.2307"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6914 27.7693V37.0001"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.5391 27.7693V37.0001"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.3828 27.7693V37.0001"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.2305 15.7692V12.0769"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.8477 15.7692V12.0769"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.3828 12.077V6.53857"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6914 12.077V6.53857"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6914 14.8462V13.9231"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.5391 14.8462V13.9231"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.3828 14.8462V13.9231"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M26.8477 15.7692C26.8477 13.2208 28.9146 11.1538 31.463 11.1538C34.0114 11.1538 36.0784 13.2208 36.0784 15.7692C36.0784 18.3176 34.0114 20.3846 31.463 20.3846C28.9146 20.3846 26.8477 18.3176 26.8477 15.7692Z"
                fill="#FF6700"
              />
              <path
                d="M1 9.42392H2.00579C2.00579 7.831 3.17526 6.53857 4.61663 6.53857C6.058 6.53857 7.14036 7.74931 7.21428 9.2693C8.56853 8.2657 10.4032 9.33931 10.4032 11.154H12.0769"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25.9219 8.02184C25.9763 4.44692 30.1734 3.39306 31.4944 6.63983C32.818 5.1537 35.0541 6.2328 35.0541 8.38469H36.9988"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.76953 17.6154H6.60084C6.60084 15.0903 8.95172 13.869 10.2311 15.7835"
                stroke="#5B5B5B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Services
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <Link href="/signin" className="flex items-center mr-8">
          <BiSolidOffer className="text-orange-500 size-6 mr-1" />
          Profile
        </Link>
        <Link
          href="/create-blog"
          className="flex items-center bg-[#0D1422] text-white px-5 py-2 rounded-3xl"
        >
          {/* <svg
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_1_187)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.0047 0C11.0013 0 13.4973 2.496 13.4973 5.49143C13.4973 6.46971 13.1613 7.43429 12.6916 8.30743C12.2196 9.18514 11.5956 10.0034 10.9761 10.7006C10.4361 11.3071 9.85533 11.876 9.23785 12.4034C9.0362 12.5762 8.82805 12.7413 8.61385 12.8983C8.5416 12.9508 8.46725 13.0004 8.39099 13.0469C8.32772 13.0845 8.26116 13.1162 8.19213 13.1417C8.03928 13.1911 7.87319 13.1788 7.72928 13.1074C7.6909 13.0892 7.65351 13.069 7.61728 13.0469C7.54057 12.9993 7.46584 12.9485 7.39328 12.8949C7.17941 12.7371 6.97164 12.5713 6.77042 12.3977C6.15363 11.8675 5.57327 11.2963 5.03328 10.688C4.41385 9.98857 3.78985 9.168 3.31899 8.29371C2.84928 7.42286 2.51213 6.46171 2.51213 5.49143C2.51213 2.496 5.00813 0 8.0047 0ZM8.0047 7.13143C7.56975 7.13143 7.15261 6.95864 6.84505 6.65108C6.53749 6.34352 6.3647 5.92638 6.3647 5.49143C6.3647 5.05647 6.53749 4.63933 6.84505 4.33177C7.15261 4.02421 7.56975 3.85143 8.0047 3.85143C8.43966 3.85143 8.8568 4.02421 9.16436 4.33177C9.47192 4.63933 9.6447 5.05647 9.6447 5.49143C9.6447 5.92638 9.47192 6.34352 9.16436 6.65108C8.8568 6.95864 8.43966 7.13143 8.0047 7.13143ZM11.5476 11.6069C11.7578 11.3703 11.9681 11.1223 12.1761 10.864H13.711C13.9396 10.864 14.1453 11.0011 14.2367 11.2103L15.9476 15.2046C15.9848 15.2915 15.9999 15.3864 15.9915 15.4806C15.9831 15.5748 15.9514 15.6655 15.8993 15.7445C15.8472 15.8234 15.7763 15.8882 15.6929 15.933C15.6096 15.9778 15.5165 16.0012 15.4218 16.0011H0.587562C0.492953 16.0012 0.399804 15.9778 0.316474 15.933C0.233144 15.8882 0.162241 15.8234 0.110128 15.7445C0.0580148 15.6655 0.0263229 15.5748 0.0178963 15.4806C0.00946963 15.3864 0.024572 15.2915 0.0618478 15.2046L1.77385 11.2103C1.81794 11.1074 1.89126 11.0198 1.98472 10.9582C2.07818 10.8967 2.18765 10.8639 2.29956 10.864H3.84813C4.05042 11.1154 4.25613 11.3589 4.46185 11.5909C5.21842 12.4434 5.98185 13.1634 6.57613 13.672C6.87328 13.9269 7.1327 14.1314 7.33156 14.2754C7.42985 14.3474 7.52013 14.408 7.5967 14.4549C7.66322 14.4996 7.73601 14.5343 7.8127 14.5577C7.96878 14.609 8.1388 14.5967 8.28585 14.5234C8.33156 14.5029 8.37385 14.4777 8.41156 14.456C8.50198 14.4006 8.59006 14.3415 8.67556 14.2789C8.87442 14.1349 9.1327 13.9314 9.43099 13.6789C10.0253 13.1737 10.791 12.4571 11.5464 11.6069H11.5476Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_187">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg> */}
          <FaPenToSquare className="mr-3" />
          Write
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
