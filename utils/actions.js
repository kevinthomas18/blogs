export const fetchAllBlogs = async () => {
  try {
    const response = await fetch("https://blogs-23vc.onrender.com/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
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

export const getBlogDetail = async (slug, token) => {
  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/blogs/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blog details");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

// export async function createNewPost(data, token) {
//   const { title, summary, content, isPublished, premium, files } = data;

//   const formData = new FormData();
//   formData.set("title", title);
//   formData.set("short_description", summary);
//   formData.set("description", content);
//   formData.set("is_published", isPublished);
//   formData.set("premium", premium);
//   formData.set("image", files);

//   try {
//     const response = await fetch("https://blogs-23vc.onrender.com/blogs", {
//       method: "POST",
//       body: formData,
//       credentials: "include",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       return { success: true };
//     } else {
//       const errorText = await response.text();
//       return { success: false, error: errorText };
//     }
//   } catch (error) {
//     return {
//       success: false,
//       error: "Error during submission: " + error.message,
//     };
//   }
// }

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
