"use server";
import { revalidatePath } from "next/cache";

export const fetchAllBlogs = async (page) => {
  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com?page=${page}&limit=15`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 120 },
      }
    );

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
      revalidatePath("/");
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

export const createComment = async (slug, comment, token) => {
  if (!comment.trim()) return;

  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/blogs/${slug}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      revalidatePath(`/blogs/${slug}`);
      return { success: true, data };
    } else {
      throw new Error(data.message || "Failed to add comment");
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteReply = async (forumId, replyId, token) => {
  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/api/forum/${forumId}/reply/${replyId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      revalidatePath(`/discuss-forum/${forumId}`);
    } else {
      throw new Error("Failed to delete reply");
    }
    //console.log("forumID", forumId, "replyId", replyId, "token", token);
  } catch (error) {
    console.log(error);
  }
};

export const CreateThread = async (newThreadTitle, newThreadContent, token) => {
  console.log(newThreadTitle, newThreadContent, token);
  try {
    const response = await fetch("https://blogs-23vc.onrender.com/api/forum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newThreadTitle,
        description: newThreadContent,
      }),
    });
    const data = await response.json();
    revalidatePath("/discuss-forum");
    return data;
  } catch (error) {
    console.error("Error creating thread:", error);
  }
};

export const deleteThread = async (params, token) => {
  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/api/forum/${params}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    revalidatePath("/discuss-forum");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const createReply = async (threadId, token, reply) => {
  console.log("first", threadId, "second", token, "third", reply);
  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/api/forum/${threadId}/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply: reply }),
      }
    );
    if (response.ok) {
      revalidatePath(`/discuss-forum/${threadId}`);
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (id, token) => {
  console.log(id, token, "testing...");
  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/blogs/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      revalidatePath("/");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("An error occurred while deleting the blog:", error.message);
  }
};

export const editBlog = async (formData, slug, token) => {
  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/blogs/${slug}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      revalidatePath(`/blogs/${slug}`);
      // revalidatePath(`/`);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const menu = async () => {
  try {
    const response = await fetch(
      "https://blogs-23vc.onrender.com/api/menu/maindesktop"
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogSlugs = async () => {
  try {
    const response = await fetch(`https://blogs-23vc.onrender.com/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    //return data;
    return data.data.map((blog) => ({
      slug: blog.id,
    }));
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await fetch("https://blogs-23vc.onrender.com/api/career", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getJobDetail = async (id) => {
  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/api/career/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllServices = async () => {
  try {
    const response = await fetch(
      "https://blogs-23vc.onrender.com/api/services",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 120 },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createLikeComment = async (id, blogId, token) => {
  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/blogs/${blogId}/comment/${id}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      revalidatePath(`/blogs/${blogId}`);
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

export const removeLikeComment = async (id, blogId, likeId, token) => {
  try {
    const response = await fetch(
      `https://blogs-23vc.onrender.com/blogs/${blogId}/comment/${id}/like/${likeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      revalidatePath(`/blogs/${blogId}`);
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};
