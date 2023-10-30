const fs = require("fs");
const path = require("path");
const convertToArray = () => {
  const data = fs.readFileSync("json.txt", "utf-8");
  return data
    .split("\n")
    .filter(Boolean)
    .map((el) => JSON.parse(el));
};
const writeRecord = (record, cb) => {
  fs.appendFile(
    path.join(__dirname, "json.txt"),
    JSON.stringify(record) + "\n",
    (err) => {
      if (err) throw err;
      cb();
    }
  );
};

module.exports = { convertToArray, writeRecord };
