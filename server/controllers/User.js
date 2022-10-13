const User = require('../models/User');
exports.createOrUpdateUser = async (req, res) => {
  try {
    const { name, picture, email } = req.user;
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      const user = await User.findOneAndUpdate(
        { email },
        { name, picture },
        { new: true }
      ).exec();
      res.json(user);
    } else {
      const user = await new User({
        name: name,
        email: email,
        picture: picture,
      }).save();
      res.json(user);
    }
  } catch (err) {
    res.json({
      data: err,
    });
    console.log(err);
  }
};

exports.currentUser = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email: email }).exec();
  res.json(user);
};
