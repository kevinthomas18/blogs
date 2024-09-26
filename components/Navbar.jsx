import Link from "next/link";
import { BiSolidOffer } from "react-icons/bi";
import { FaPenToSquare, FaChevronDown } from "react-icons/fa6";
import { menu } from "@/utils/actions"; // Fetches menu data
import Image from "next/image";

const Navbar = async () => {
  const menuItem = await menu();
  console.log(menuItem.icon[1]);
  return (
    <nav className="flex justify-between items-center mx-4 p-5 font-inter">
      {/* Main Menu */}
      <div className="flex items-center mr-4">
        <div className="hidden md:flex items-center">
          <Link href={"/"}>
            <img
              src={`https://blogs-23vc.onrender.com${menuItem?.icon[1]?.value}`}
              alt="logo"
              className="w-14 h-14 mr-5"
            />
          </Link>
          {menuItem?.data.map((item) => (
            <div key={item.id} className="group relative">
              <Link
                href={item.link}
                className="flex items-center mr-10 text-gray-800 hover:text-blue-500 transition-colors duration-200"
              >
                {/* Optional icon */}
                <Image
                  src={`https://blogs-23vc.onrender.com${item.icon}`}
                  alt="icon"
                  height={24}
                  width={24}
                  className="w-8 h-8 mr-2"
                />
                {item.title}

                {/* Dropdown Icon if submenu exists */}
                {item.submenu.length > 0 && (
                  <FaChevronDown className="ml-2 text-gray-500" />
                )}
              </Link>

              {/* Submenu (if available) */}
              {item.submenu.length > 0 && (
                <div className="absolute left-0 hidden group-hover:block bg-white shadow-md rounded-lg z-10 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:delay-1000">
                  <ul className="py-2">
                    {item.submenu.map((submenuItem, index) => (
                      <li
                        key={submenuItem.id}
                        className={`relative px-4 py-2 w-72 ${
                          index < item.submenu.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }`}
                      >
                        <Link
                          href={submenuItem.link}
                          className="block hover:bg-gray-100 transition-colors"
                        >
                          {submenuItem.title}
                        </Link>

                        {/* Nested submenu (if available) */}
                        {submenuItem.submenu.length > 0 && (
                          <div className="relative pl-4">
                            <ul className="bg-white shadow-md mt-2 rounded-lg">
                              {submenuItem.submenu.map((childSubmenuItem) => (
                                <li
                                  key={childSubmenuItem.id}
                                  className="px-4 py-2 border-b border-gray-200 last:border-b-0"
                                >
                                  <Link
                                    href={`${submenuItem.link}/${childSubmenuItem.link}`}
                                    className="block hover:bg-gray-100 transition-colors"
                                  >
                                    {childSubmenuItem.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Profile and Write Button */}
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

// import Link from "next/link";
// import { BiSolidOffer } from "react-icons/bi";
// import { FaPenToSquare } from "react-icons/fa6";
// import { menu } from "@/utils/actions";
// import Image from "next/image";

// const Navbar = async () => {
//   const menuItem = await menu();
//   //console.log(menuItem);
//   //console.log(menuItem.data[4].submenu);
//   console.log(menuItem.data[4].submenu[0].submenu);
//   return (
//     <nav className="flex justify-between mx-4 p-5 font-inter">
//       <div className="flex items-center mr-4">
//         <div className="hidden md:flex items-center">
//           {menuItem?.data.map((item) => {
//             return (
//               <Link
//                 key={item.id}
//                 href={item.link}
//                 className="flex items-center mr-10 text-gray-800 hover:text-blue-500 transition-colors duration-200"
//               >
//                 {/* <Image
//                   src={`https://blogs-23vc.onrender.com${item.icon}`}
//                   alt="icon"
//                   height={8}
//                   width={8}
//                   className="w-8 mr-2"
//                 /> */}
//                 {item.title}
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//       <div className="flex items-center">
//         <Link href="/signin" className="flex items-center mr-8">
//           <BiSolidOffer className="text-orange-500 size-6 mr-1" />
//           Profile
//         </Link>
//         <Link
//           href="/create-blog"
//           className="flex items-center bg-[#0D1422] text-white px-5 py-2 rounded-3xl"
//         >
//           <FaPenToSquare className="mr-3" />
//           Write
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
