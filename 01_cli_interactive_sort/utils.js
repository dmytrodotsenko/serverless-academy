const convertArray = (str) => {
  return str.split(" ").map((el) => {
    if (!isNaN(el)) {
      return +el;
    }
    return el;
  });
};

const filtertArrayByType = (array, type) => {
  return array.filter((item) => typeof item === type);
};

module.exports = { convertArray, filtertArrayByType };
