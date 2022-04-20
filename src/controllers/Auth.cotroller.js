const bcrypt = require("bcrypt");
const { matchedData, validationResult } = require("express-validator");
const User = require("../models/User.model");

module.exports = {
  signin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    // E-mail Validation
    const user = await User.findOne({ where: { user_email: data.user_email } });
    if (!user) {
      res.json({ response: { error: "E-mail e/ou senha inválidos" } });
      return;
    }

    // Password Validation
    const match = await bcrypt.compare(data.user_password, user.user_password);
    if (!match) {
      res.json({ response: { error: "E-mail e/ou senha inválidos" } });
      return;
    }
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    user.token = token;
    await user.save();
    res.json({ token });
    return;
  },

  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);
    // Verified if e-mail exist
    const user = await User.findOne({ where: { user_email: data.user_email } });
    if (user) {
      res.json({
        error: { email: { message: "E-mail já existe em sistema" } },
      });
      return;
    }

    const passwordHash = await bcrypt.hash(data.user_password, 10);
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
      role_id: 2,
      first_name: data.first_name,
      last_name: data.last_name,
      user_email: data.user_email,
      user_password: passwordHash,
      token: token,
    });
    await newUser.save();
    // Result True Data
    res.json({ success: true, token });
    return;
  },
};
