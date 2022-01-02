const shorten = require("./shorten.js");

module.exports = function lineBreaker(string, length, maxLength) {
  if (string.length <= length) return string;

  let chunk = [];

  for (let i = 0; string.length > length; i++) {
    chunk.push(string.substr(0, length));
    string = string.slice(length, string.length);
  }
  string = chunk.join("\n");

  if (maxLength) string = shorten(string, maxLength);

  return string;
};
