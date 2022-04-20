# Aplicativo de gerenciamento de vídeos do youtube

![NPM](https://img.shields.io/npm/v/cors.svg) ![BUILD](https://camo.githubusercontent.com/7085e7e54b8fe93d5f84f3942b259714ec8ebd2d8d8ee0899ddc20ae851893ee/68747470733a2f2f696d672e736869656c64732e696f2f7472617669732f6d6f74646f746c612f646f74656e762f6d61737465722e7376673f7374796c653d666c61742d737175617265)

Seu objetivo é criar um aplicativo de gerenciamento de vídeos do youtube, que permita aos usuários pesquisar e assistir o vídeo escolhido.

### Installation
nodejs na versão: v16.14.2

Install the dependencies and devDependencies and start the server.
```
git clone https://github.com/cosmeaf/aplicativo_youtube.git
cd aplicativo_youtube
npm install
```
```
npm install bcrypt cors dotenv express express-validator googleapis --save
npm install mysql2 sequelize validator youtube-search-without-api-key mustache-express --save
```
```
npm install nodemon --save-dev
```

#### The project used format MVC and Route
MVC is an acronym for Model-View-Controller and is a software design pattern, or software architecture pattern formulated in the 1970s, focused on code reuse and three-tier separation of concepts.

![MVC](https://github.com/cosmeaf/aplicativo_youtube/blob/master/public/img_github/padrao_mvc.jpg)

#### Create Tables From Database
```
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
CREATE TABLE `tbl_roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(10) NOT NULL,
  `role_descripton` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `tbl_roles` (`id`, `role_name`, `role_descripton`) VALUES
(1, 'admin', 'Support'),
(2, 'staff', 'Employes'),
(3, 'client', 'Clients');
CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(256) NOT NULL,
  `cell_phone_number` varchar(15) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `token` varchar(256) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tbl_users` (`id`, `role_id`, `first_name`, `last_name`, `user_email`, `user_password`, `cell_phone_number`, `phone_number`, `token`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Cosme', 'Alves', 'cosmealex@gmail.com', '$2b$10$GMeICdwkuryx3Nn9ApZ0m.dsYWHldk/DdrjpxA2DbOH2NkwxAeiFO', NULL, NULL, '$2b$10$IUXqTVk8I4mqq2aPA2MlLOi8I3LFPOTijWzKbJPm0/9fUxjzuUJmO', '2022-04-19 15:39:24', '2022-04-20 10:53:32'),
(2, 2, 'Daiana', 'Alves', 'daianalopes8@gmail.com', '$2b$10$5SDqRbjPP6ZDoBJmgDCGnOE4tu1ztHLl9TARvw5NQprBn8NCJiiNe', NULL, NULL, '$2b$10$wScii2GhNwsDGBZJWtGbvO92U8TcPC96ssyjL..ibL2OTzV0YiXKC', '2022-04-20 11:08:46', '2022-04-20 11:08:46'),
(3, 2, 'Sueli', 'Felix', 'sueli.felix@gmail.com', '$2b$10$koFoDr4SX/n3YD9TS6Kzjuk/fKyQiXZV5Yeb/jd6n6zHlCDYEFYFC', NULL, NULL, '$2b$10$9u5vwsVuBxv3pidls4ywx.Yy5es87hbHC019BWYrgoYIWfF8.dbQ6', '2022-04-20 11:17:17', '2022-04-20 11:17:17');

CREATE TABLE `tbl_videos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `video_title` varchar(500) DEFAULT NULL,
  `video_url` varchar(500) DEFAULT NULL,
  `video_quantity` int(11) DEFAULT NULL,
  `videos_views` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tbl_videos` (`id`, `user_id`, `video_title`, `video_url`, `video_quantity`, `videos_views`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Cosme Alves', NULL, NULL, NULL, '2022-04-20 11:04:30', '2022-04-20 11:04:30'),
(2, 1, 'Cosme Alves', NULL, NULL, NULL, '2022-04-20 11:09:18', '2022-04-20 11:09:18'),
(3, 1, 'Cosme Alves', NULL, NULL, NULL, '2022-04-20 11:09:41', '2022-04-20 11:09:41'),
(4, 1, 'Cosme Alves', NULL, NULL, NULL, '2022-04-20 11:10:27', '2022-04-20 11:10:27'),
(5, 1, 'Cosme Alves', NULL, NULL, NULL, '2022-04-20 11:10:43', '2022-04-20 11:10:43');


ALTER TABLE `tbl_roles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tbl_videos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tbl_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `tbl_videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

```
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

#### Middleware File
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

### License
MIT
