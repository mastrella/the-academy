const nextConfig = {
  async redirects() {
    return [
      {
        source: "/academy-scarborough",
        destination: "/academy-toronto",
        permanent: true,
      },
      {
        source: "/scarborough",
        destination: "/academy-toronto",
        permanent: true,
      },
      {
        source: "/scarborough-schedule",
        destination: "/toronto-schedule",
        permanent: true,
      },
      {
        source: "/schedule",
        destination: "/toronto-schedule",
        permanent: true,
      },
      {
        source: "/trial",
        destination: "/free-trial",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
