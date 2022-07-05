module.exports = function setHeaders(req, res, next) {
  res.headers("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD");
  res.headers(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};
