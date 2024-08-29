import React from "react";
import DiscussionForum from "../../components/DiscussionForum";
import { fetchAllForums } from "@/utils/actions";

const page = async () => {
  const forums = await fetchAllForums();
  //console.log(forums);

  return (
    <div>
      <DiscussionForum forums={forums} />
    </div>
  );
};

export default page;
