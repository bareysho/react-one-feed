const Youtube = require("youtube-api");

const getChannelProfile = (token) => {
  Youtube.authenticate({ type: "oauth", token })

  return Youtube.channels.list({ part: 'snippet,contentDetails,statistics', mine: true })
    .then((response) => {
      const dataItem = response.data.items[0];

      const { id: accountId, snippet } = dataItem;
      const { title: displayName, thumbnails: { default: { url: photo } } } = snippet;

      return { accountId, displayName, photo }
    })
};

module.exports = {
  getChannelProfile,
}
