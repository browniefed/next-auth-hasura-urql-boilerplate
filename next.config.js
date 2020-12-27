const withImages = require("next-images");
module.exports = withImages({
  images: {
    domains: ["assets.vercel.com"],
  },
});
