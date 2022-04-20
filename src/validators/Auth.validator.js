const { checkSchema } = require("express-validator");

module.exports = {
  /************************ REGISTER ***************************/
  signup: checkSchema({
    first_name: {
      trim: true,
      isLength: {
        options: { min: 3 },
      },
      errorMessage: "Nome precisa ter pelomenos 3 caracteres",
    },
    last_name: {
      trim: true,
      isLength: {
        options: { min: 3 },
      },
      errorMessage: "Nome precisa ter pelomenos 3 caracteres",
    },
    user_email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "E-mail inválido",
    },
    user_password: {
      isLength: {
        options: { min: 6 },
      },
      errorMessage: "Senha precisa ter pelomenos 3 caracteres",
    },
  }),
  /************************ LOGIN ***************************/
  signin: checkSchema({
    user_email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "E-mail inválido",
    },
    user_password: {
      isLength: {
        options: { min: 6 },
      },
      errorMessage: "Senha precisa ter pelomenos 6 caracteres",
    },
  }),
};
