module.exports = (text, size) => {
  if (typeof text !== "string") return "";
  if (text.length > size) return text.substr(0, size) + "...";
  return text;
};
