const convertToEmbedURL=(url) => {
    const embedURL = url.replace("/track/", "/embed/track/").replace("?si=", "?utm_source=generator");
    return embedURL;
  }
  module.exports = convertToEmbedURL;