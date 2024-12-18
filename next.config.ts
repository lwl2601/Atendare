module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.atendare.com/:path*", // URL da API externa
      },
    ];
  },
};
