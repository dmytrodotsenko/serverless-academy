const inquirer = require("inquirer");
const { convertToArray, writeRecord } = require("./utils");
const {
  startingQuestion,
  recordQuestions,
  searchingQestions,
} = require("./questions");

const createRecords = () => {
  inquirer.prompt(startingQuestion).then((answer) => {
    if (answer.username === "") {
      searchingValues();
    } else {
      inquirer
        .prompt(recordQuestions)
        .then((answers) => {
          writeRecord({ ...answer, ...answers }, createRecords);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
};
const searchingValues = () => {
  inquirer.prompt(searchingQestions[0]).then(({ confirmAction }) => {
    if (confirmAction) {
      const array = convertToArray();
      console.log(array);
      inquirer.prompt(searchingQestions[1]).then(({ name }) => {
        const search = array.filter(
          (el) => el.username.toLowerCase() === name.toLowerCase()
        );
        if (search[0]) {
          console.log(`User ${name} was found.
${JSON.stringify(search[0])}`);
        } else {
          console.log("User was not found please try again...");
        }
      });
    } else {
      return;
    }
  });
};

createRecords();
