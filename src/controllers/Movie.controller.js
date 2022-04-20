const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  get_all: async (req, res) => {
    let { item } = req.query;
    let youtubeData = [];
    const { data } = await google.youtube("v3").search.list({
      key: process.env.YOUTUBE_TOKEN,
      part: "snippet",
      q: item,
      maxResults: 10,
    });
    data.items.forEach((item) => {
      youtubeData.push(
        `Title: ${item.snippet.title}
        Description: ${item.snippet.description}
        channelId: ${item.snippet.channelId}`
      );
    });
    res.json(youtubeData);
    return;
  },
};
