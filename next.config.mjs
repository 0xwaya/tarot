export default {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1080, 1280, 1920],
    imageSizes: [64, 96, 128, 160, 200, 240, 320],
    minimumCacheTTL: 2678400,
  },
};
