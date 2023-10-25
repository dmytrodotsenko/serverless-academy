let messages = require("./messages");
const { convertArray, filtertArrayByType } = require("./utils");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const start = () => {
  readline.question(messages.startMessage, (words) => {
    if (!words) {
      console.log("\n PLEASE WRITE AT LEAST 1 ELEMENT \n");
      start();
    }
    if (words === "exit") {
      readline.close();
      return;
    }
    sortData(convertArray(words));
  });
};

const sorting = (arr, sortVariant) => {
  const data = arr.sort(sortVariant);
  console.log(data);
  start();
};

const sortData = (dataArray) => {
  readline.question(messages.sortsVariant, (variant) => {
    if (variant === "exit") {
      console.log(messages.exitMessage);
      readline.close();
      return;
    }
    switch (variant) {
      case "1": {
        sorting(filtertArrayByType(dataArray, "string"), (a, b) =>
          a.localeCompare(b)
        );
        break;
      }
      case "2": {
        sorting(filtertArrayByType(dataArray, "number"), (a, b) => a - b);
        break;
      }
      case "3": {
        sorting(filtertArrayByType(dataArray, "number"), (a, b) => b - a);
        break;
      }
      case "4": {
        sorting(
          filtertArrayByType(dataArray, "string"),
          (a, b) => a.length - b.length
        );
        break;
      }
      case "5": {
        const caseData = filtertArrayByType(dataArray, "string");
        console.log([...new Set(caseData)]);
        start();
        break;
      }
      case "6": {
        console.log([...new Set(dataArray)]);
        start();
        break;
      }
      default: {
        console.log("\n Please enter the correct variant \n");
        sortData(dataArray);
        break;
      }
    }
  });
};

start();
