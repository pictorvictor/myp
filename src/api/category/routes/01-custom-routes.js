module.exports = {
  routes: [
    {
      method: "GET",
      path: "/categories/:slug([a-z||-]+)",
      handler: "category.findBySlug",
    }
  ]
};
