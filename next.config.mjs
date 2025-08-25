/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don’t let ESLint block builds while we polish
  eslint: { ignoreDuringBuilds: true },

  // Cache static assets aggressively in production (bump filenames when updating)
  async headers() {
    return [
      {
        // Video/audio
        source: "/:all*(mp4|webm|ogg|mp3|wav|m4a)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Images/icons
        source: "/:all*(jpg|jpeg|png|gif|webp|avif|svg|ico)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Web fonts
        source: "/:all*(woff|woff2|ttf|otf)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  // Optional: easier to run on servers/containers
  // output: "standalone",
};

export default nextConfig;
