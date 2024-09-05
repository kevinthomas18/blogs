"use client";
import axios from "axios";
import React from "react";

const page = () => {
  const handleFetch = async () => {
    try {
      const response = await axios.get("/api/proxy");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className="m-20">
      <button className="capitalize" onClick={handleFetch}>
        fetch
      </button>
    </div>
  );
};

export default page;

// "use client";
// import axios from "axios";
// import React from "react";

// const page = () => {
//   const handleFetch = async () => {
//     try {
//       const response = await axios.get(
//         "https://cors-anywhere.herokuapp.com/http://www.thehappyhomes.com/getresources.aspx"
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     }
//   };

//   return (
//     <div className="m-20">
//       <button className="capitalize" onClick={handleFetch}>
//         fetch
//       </button>
//     </div>
//   );
// };

// export default page;
