/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['github.com', 'localhost'], // Add any external domains you'll load images from
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    // Support for GLTF files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/images',
          outputPath: 'static/images',
        },
      },
    });
    
    // GLSL shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });
    
    return config;
  },
  // Enable module aliases for better imports
  experimental: {
    appDir: false,
    optimizeFonts: true,
    optimizeCss: true,
  },
};

module.exports = nextConfig;
