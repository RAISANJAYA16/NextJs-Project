const FALLBACK_IMAGE = "/assets/images/placeholder.jpg";

export function getProductImageUrl(url, fallback = FALLBACK_IMAGE) {
  if (!url) return fallback;

  return url.startsWith("http://res.cloudinary.com/")
    ? url.replace("http://", "https://")
    : url;
}
