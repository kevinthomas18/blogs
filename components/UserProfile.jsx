"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const UserProfile = () => {
  const { data: session } = useSession();
  const defaultImage =
    "https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png";

  console.log("Session data:", session);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="flex items-center justify-center p-6 bg-gray-100">
        <img
          src={session?.user?.image || defaultImage}
          alt="Profile Image"
          className="w-24 h-24 rounded-full border-4 border-yellow-500 object-cover"
        />
      </div>
      <div className="text-center p-6">
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 capitalize">Name</p>
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {session?.user?.name || "User Name"}
          </h2>
        </div>
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-600">Email</p>
          <h2 className="text-lg font-medium text-gray-700">
            {session?.user?.email || "user@example.com"}
          </h2>
        </div>
        <button
          onClick={() => signOut()}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
