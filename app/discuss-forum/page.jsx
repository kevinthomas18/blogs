import React from "react";
import DiscussionForum from "./create-thread";
import { fetchAllForums } from "@/utils/actions";

const page = async () => {
  const forums = await fetchAllForums();
  console.log(forums);

  return (
    <div>
      <DiscussionForum forums={forums} />
    </div>
  );
};

export default page;
