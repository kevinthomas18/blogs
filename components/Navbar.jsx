import Link from "next/link";
import { BiSolidOffer } from "react-icons/bi";
import { FaPenToSquare } from "react-icons/fa6";
import { menu } from "@/utils/actions";
import Image from "next/image";

const Navbar = async () => {
  const menuItem = await menu();
  console.log(menuItem);
  return (
    <nav className="flex justify-between mx-4 p-5 font-inter">
      <div className="flex items-center mr-4">
        <div className="hidden md:flex items-center">
          {menuItem?.data.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.link}
                className="flex items-center mr-10 text-gray-800 hover:text-blue-500 transition-colors duration-200"
              >
                <Image
                  src={`https://blogs-23vc.onrender.com${item.icon}`}
                  alt="icon"
                  height={8}
                  width={8}
                  className="w-8 mr-2"
                />
                {item.title}
              </Link>
            );
          })}
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
          <FaPenToSquare className="mr-3" />
          Write
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
