module.exports = (text, size) => {
  if (typeof text !== "string") return "";
  else if (text.length > size) return text.slice(0, size) + "...";
  else return text;
};
