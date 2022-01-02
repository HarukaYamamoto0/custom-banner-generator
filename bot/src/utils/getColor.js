function getColor(color) {
  let background = null;

  function checkLink(link) {
    const reg = /^(https?:\/\/)((([-a-z0-9]{1,})?(-?)+[-a-z0-9]{1,})(\.))+([a-z]{1,63})\/((([a-z0-9._\-~#%])+\/)+)?([a-z0-9._\-~#%]+)\.(jpg|jpeg|gif|png|bmp)$/i;
    return reg.test(link);
  }

  function checkHex(hex) {
    if (hex.charAt(0) == "#") {
      const number = Number(hex.replace("#", "0x"));
      return isNaN(number) ? false : true;
    } else {
      return false;
    }
  }

  if (checkHex(color)) {
    background = "hexa:" + color;
  }

  if (checkLink(color)) {
    background = "link:" + color;
  }
  return background;
}

module.exports = getColor;
