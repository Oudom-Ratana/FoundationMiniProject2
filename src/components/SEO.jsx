import { useEffect } from "react";


export default function SEO({
  title = "React Foundation Store",
  description = "Discover premium tech products, gadgets, and accessories at React Foundation Store. Built with React 19, Redux Toolkit, and Tailwind CSS.",
  image = "/og-image.jpg",
  url,
  type = "website",
  siteName = "React Foundation Store",
}) {
  useEffect(() => {
    // 1. Format title
    const formattedTitle = title.includes(siteName)
      ? title
      : `${title} | ${siteName}`;

    document.title = formattedTitle;

    // 2. Helper to set or update meta tag
    const updateMetaTag = (selector, attrName, attrVal, contentVal) => {
      if (!contentVal) return;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentVal);
    };

    
    const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";
    const currentHref = typeof window !== "undefined" ? window.location.href : "";
    const pageUrl = url || currentHref;

    const absoluteImage = image?.startsWith("http")
      ? image
      : `${currentOrigin}${image?.startsWith("/") ? "" : "/"}${image || "og-image.jpg"}`;

    // Standard Meta
    updateMetaTag('meta[name="title"]', "name", "title", formattedTitle);
    updateMetaTag('meta[name="description"]', "name", "description", description);

    // Open Graph Tags (Facebook, LinkedIn, Discord, Slack, etc.)
    updateMetaTag('meta[property="og:title"]', "property", "og:title", formattedTitle);
    updateMetaTag('meta[property="og:description"]', "property", "og:description", description);
    updateMetaTag('meta[property="og:image"]', "property", "og:image", absoluteImage);
    updateMetaTag('meta[property="og:url"]', "property", "og:url", pageUrl);
    updateMetaTag('meta[property="og:type"]', "property", "og:type", type);
    updateMetaTag('meta[property="og:site_name"]', "property", "og:site_name", siteName);

    // Twitter Card Meta
    updateMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    updateMetaTag('meta[name="twitter:title"]', "name", "twitter:title", formattedTitle);
    updateMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    updateMetaTag('meta[name="twitter:image"]', "name", "twitter:image", absoluteImage);
    updateMetaTag('meta[name="twitter:url"]', "name", "twitter:url", pageUrl);
  }, [title, description, image, url, type, siteName]);

  return null;
}
