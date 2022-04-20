const User = require("../models/User.model");

module.exports = {
  private: async (err, req, res, next) => {
    if (!req.query.token && !req.body.token && req.headers["x-access-token"]) {
      res.json({ notallowed: true });
      return;
    }
    let token = "";
    if (req.query.token) {
      token = req.query.token;
    }
    if (req.body.token) {
      token = req.body.token;
    }
    if (token == "") {
      res.json({ notallowed: true });
      return;
    }
    const user = await User.findOne({ where: { token: token } });
    if (!user.token) {
      res.json({ notallowed: true });
      return;
    }
    next();
  },
};
