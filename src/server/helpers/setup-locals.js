export default (req, res, next) => {
  res.locals.currentPageUrl = req.originalUrl.split('?').shift();
  res.locals.csrfToken = req.csrfToken();

  next();
};
