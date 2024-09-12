"use client"; // This makes the component a client-side component
import { menu } from "@/utils/actions";
import { useEffect, useState } from "react";

export default function DynamicFavicon() {
  const [faviconUrl, setFaviconUrl] = useState("/favicon.ico"); // Default favicon

  useEffect(() => {
    async function fetchFavicon() {
      try {
        const response = await menu(); // Replace with your actual API
        const data = await response.icon[1];
        console.log(data);
        setFaviconUrl(`https://blogs-23vc.onrender.com${data.value}`);
        console.log(faviconUrl);
        // Assuming your API returns { faviconUrl: 'https://example.com/favicon.ico' }
      } catch (error) {
        console.error("Error fetching favicon URL:", error);
      }
    }

    fetchFavicon();
  }, []);

  useEffect(() => {
    if (faviconUrl) {
      const link = document.querySelector("link[rel='icon']");
      if (link) {
        link.href = faviconUrl; // Set the favicon dynamically
      } else {
        // Create a new link element if it doesn't exist
        const newLink = document.createElement("link");
        newLink.rel = "icon";
        newLink.href = faviconUrl;
        document.head.appendChild(newLink);
      }
    }
  }, [faviconUrl]); // Re-run the effect whenever faviconUrl changes

  return null; // No need to render anything in the UI
}
