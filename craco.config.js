const path = require('path');

module.exports = {
  webpack: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      assets: path.resolve(__dirname, "src/assets/"),
      pages: path.resolve(__dirname, "src/pages/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      services: path.resolve(__dirname, "src/services/"),
      store: path.resolve(__dirname, "src/store/"),
      router: path.resolve(__dirname, "src/router/"),
      style: path.resolve(__dirname, "src/assets/styles/pageStyles/"),
    }
  }
};