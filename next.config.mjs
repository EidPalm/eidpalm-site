/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don’t let ESLint block builds while we polish
  eslint: { ignoreDuringBuilds: true },

  // Allow opening the dev site from your LAN IP (removes that warning)
  // Put your actual LAN IP here; keep localhost too.
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://192.168.1.84:3000',
    // Or allow your whole 192.168.1.* subnet on port 3000:
    // /^http:\/\/192\.168\.1\.\d+:3000$/
  ],

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
