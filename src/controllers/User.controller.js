const bcrypt = require("bcrypt");
const User = require("../models/User.Model");

module.exports = {
  /******************************************************************************/
  /************************** GET ALL USERS *************************************/
  get_all: async (req, res) => {
    let user = await User.findAll();
    res.json({ user });
    return;
  },
  /******************************************************************************/
  /************************** INSERT USERS **************************************/
  insert_data: async (req, res) => {
    let { first_name, last_name, user_email, user_password } = req.body;
    const user = await User.findOne({ where: { user_email } });
    if (user) {
      res.json({ error: "E-mail já registrado em sistema" });
      return;
    }
    const passwordHash = await bcrypt.hash(user_password, 10);
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = await User.create({
      role_id: 2,
      first_name: first_name,
      last_name: last_name,
      user_email: user_email,
      user_password: passwordHash,
      token: token,
    });
    await newUser.save();
    // Result True Data
    res.json({ success: "Register Successfuly" });
    return;
  },

  /******************************************************************************/
  /************************** GET USER BY ID ************************************/
  get_by_id: async (req, res) => {
    let { id } = req.params;
    if (id == "") {
      res.json({ error: "User data is Empty" });
      return;
    }
    const user = await User.findByPk(id);
    if (!user) {
      res.json({ error: "User not Found" });
      return;
    }
    res.json({ user });
    return;
  },

  /******************************************************************************/
  /************************** UPDATE USER  **************************************/
  update_data: async (req, res) => {
    const id = parseInt(req.params.id);
    let {
      first_name,
      last_name,
      user_email,
      cell_phone_number,
      phone_number,
      user_password,
    } = req.body;
    if (isNaN(id)) {
      res.json({ error: "User not Found" });
      return;
    }
    const user = await User.findByPk(id);
    if (!user) {
      res.json({ error: "User not Found" });
      return;
    }
    const data = await User.findOne({ where: { id: id } });
    let updates = {};
    if (data.first_name) {
      updates.first_name = first_name;
    }
    if (data.last_name) {
      updates.last_name = last_name;
    }
    if (data.user_email === "") {
      updates.user_email = user_email;
    } else {
      const checkEmail = await User.findOne({
        where: { user_email: user_email },
      });
      if (checkEmail) {
        res.json({ error: "E-mail já registrado" });
        return;
      }
      updates.user_email = user_email;
    }
    if (data.cell_phone_number == "") {
      updates.cell_phone_number = cell_phone_number;
    } else {
      updates.cell_phone_number = cell_phone_number;
    }

    if (data.phone_number == "") {
      updates.phone_number = phone_number;
    } else {
      updates.phone_number = phone_number;
    }

    if (user_password == "") {
      res.json({ error: "Password não pode ser vázio" });
      return;
    } else if (data.user_password) {
      const passwordHash = await bcrypt.hash(user_password, 10);
      updates.user_password = passwordHash;
    } else {
      res.json({ error: "Password Error" });
      return;
    }

    console.log(updates);
    await User.update(updates, { where: { id } });
    res.json({ success: user });
    return;
  },

  /******************************************************************************/
  /************************** DELETE USER  **************************************/
  delete_data: async (req, res) => {
    const id = parseInt(req.params.id);
    if (id == "") {
      res.json({ error: "User data is Empty" });
      return;
    }
    const user = await User.findByPk(id);
    if (!user) {
      res.json({ error: "User not Found" });
      return;
    }
    await User.destroy({ where: { id } });

    res.json({ success: "User deleted Succesfuly" });
    return;
  },
};
