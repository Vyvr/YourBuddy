/** @format */

const getCookieValue = (cookieName) => {
  const name = cookieName + "=";
  const cookieDecoded = decodeURIComponent(document.cookie); //to be careful
  const cookieArr = cookieDecoded.split("; ");
  let res;
  cookieArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
};

export default getCookieValue;
