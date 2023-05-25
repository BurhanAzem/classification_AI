const jwt = require('jsonwebtoken');

function requireAuthentication(req, res, next) {
  let token = req.headers.authorization;
  jw = token.split(" ")
  // Check if token is present
  token = jw[1]
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'SecretKey');

    // Set the decoded user information in the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = requireAuthentication;
