export const fetchAllBlogs = async () => {
  try {
    const response = await fetch("https://blogs-23vc.onrender.com/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Optionally, you can pass 'revalidate' as part of fetch options (but it's not necessary in this case)
      },
      next: { revalidate: 10 }, // Revalidate the data every 10 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
};

// export const fetchAllBlogs = async () => {
//   try {
//     const response = await fetch("https://blogs-23vc.onrender.com/", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Failed to fetch blogs:", error);
//     throw error;
//   }
// };

export const getBlogDetail = async (slug) => {
  try {
    const response = await fetch(`https://blogs-23vc.onrender.com/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog details");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export async function createNewPost(formData, token) {
  try {
    const response = await fetch("https://blogs-23vc.onrender.com/blogs", {
      method: "POST",
      body: formData,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorText = await response.text();
      return { success: false, error: errorText };
    }
  } catch (error) {
    return {
      success: false,
      error: "Error during submission: " + error.message,
    };
  }
}

export const fetchAllForums = async () => {
  try {
    const response = await fetch("https://blogs-23vc.onrender.com/api/forum", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch forums:", error);
    throw error;
  }
};
