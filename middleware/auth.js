// If user is logged in → continue
// If not logged in → send to login page
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/auth/login');
}

module.exports = { isAuthenticated };