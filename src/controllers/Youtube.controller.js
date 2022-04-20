const yt = require("youtube-search-without-api-key");

const Videos = require("../models/Video.Model");
const User = require("../models/User.Model");

module.exports = {
  get_name: async (req, res) => {
    let { title, quantity } = req.query;
    let youtubeData = [];
    let youtubeUpdate = {};
    let total = 0;

    if (!title) {
      res.json({ error: "Campo nome não pode ser vázio" });
      return;
    }

    const videos = await yt.search(title);
    total = videos.length;
    console.log("Videos Encontrados", total);
    if (title) {
      youtubeUpdate.title = title;
      for (i in videos) {
        youtubeData.push(videos[i].title);
        if (quantity) {
          youtubeData.push(videos[i].title);
          youtubeData.splice(quantity);
        }
      }
      console.log(youtubeUpdate);
      console.log("Resultado de Busca ", youtubeData.length);
    }

    let userInfo = await User.findAll();
    userId = userInfo.map((e) => e.id);

    const video_get = await Videos.create({
      user_id: userId,
      video_title: youtubeUpdate.title,
    });

    await video_get.save();
    res.json({ youtubeData });
    return;
  },
};
