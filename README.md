# Aplicativo de gerenciamento de vídeos do youtube

![NPM](https://img.shields.io/npm/v/cors.svg) ![BUILD](https://camo.githubusercontent.com/7085e7e54b8fe93d5f84f3942b259714ec8ebd2d8d8ee0899ddc20ae851893ee/68747470733a2f2f696d672e736869656c64732e696f2f7472617669732f6d6f74646f746c612f646f74656e762f6d61737465722e7376673f7374796c653d666c61742d737175617265)

Seu objetivo é criar um aplicativo de gerenciamento de vídeos do youtube, que permita aos usuários pesquisar e assistir o vídeo escolhido.

### Installation
nodejs na versão: v16.14.2

Install the dependencies and devDependencies and start the server.

```
npm install bcrypt cors dotenv express express-validator googleapis --save
npm install mysql2 sequelize validator youtube-search-without-api-key mustache-express --save
```
```
npm install nodemon --save-dev
```

### The project used format MVC and Route
MVC is an acronym for Model-View-Controller and is a software design pattern, or software architecture pattern formulated in the 1970s, focused on code reuse and three-tier separation of concepts.

![MVC](https://github.com/cosmeaf/aplicativo_youtube/blob/master/public/img_github/padrao_mvc.jpg)

#### Server File

```
const express = require("express");
const dotenv = require("dotenv");
const mustache = require("mustache-express");
const cors = require("cors");
const path = require("path");

dotenv.config();

const apiRouter = require("../src/routes");

const server = express();

server.set("view engine", "mustache");
server.set("views", path.join(__dirname, "views"));
server.engine("mustache", mustache());

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "../public")));

server.use("/api", apiRouter);

server.use((req, res) => {
  res.send("Pagina nao encontrada");
});

let PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`- Server Running on: http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("Server Finalizado");
});
```

### Middleware File
```
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

```

#### Auth Validator File
```
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

```

#### user Validator File
```
const { checkSchema } = require("express-validator");

module.exports = {
  editAction: checkSchema({
    token: {
      notEmpty: true,
    },
    name: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 3 },
      },
      errorMessage: "Nome precisa ter pelomenos 3 caracteres",
    },
    email: {
      optional: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "E-mail inválido",
    },
    password: {
      optional: true,
      isLength: {
        options: { min: 3 },
      },
      errorMessage: "Senha precisa ter pelomenos 3 caracteres",
    },
    state: {
      optional: true,
      notEmpty: true,
      errorMessage: "Estado não preenchido",
    },
  }),
};

```


#### Router
| VERBS | ENDPOINT |
| ------ | ------ |
| POST | http://localhost:3000/api/signup |
| POST | http://localhost:3000/api/signin |
| GET |  http://localhost:3000/api/users   |
| GET |  http://localhost:3000/api/users/:id |
| PUT |  http://localhost:3000/api/users/:id |
| DELETE | http://localhost:3000/api/users/:id |
| GET |  http://localhost:3000/api/youtubeFake |

#### Test Validation Resourse
Reference link: https://resttesttest.com
![REFERENCE|LINK](https://github.com/cosmeaf/aplicativo_youtube/blob/master/public/img_github/image-signin.jpg)

