module.exports = async function getUser(ctx, next) {
  let users;
  let user;
  // get user from context
  if (!ctx.state.user) {
    users = await strapi.entityService.findMany(
      "plugin::users-permissions.user"
    );
    user = users.find((el) => el.username == "public");
  } else {
    user = ctx.state.user;
  }
  ctx.req.dataFromGetUserMiddleware = user;
  return next();
};
