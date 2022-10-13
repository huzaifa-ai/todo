const admin = require('../firebase/index.js');

exports.authUser = async (req, res, next) => {
  try {
    const token = req.headers.authtoken;
    const FirebaseUser = await admin.auth().verifyIdToken(token);
    req.user = FirebaseUser;
    console.log(req.user);

    next();
  } catch (err) {
    res.json({
      data: 'Invalid Token',
    });
    console.log(err);
  }
};
