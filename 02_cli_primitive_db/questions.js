const startingQuestion = [
  {
    type: "input",
    name: "username",
    message: "Enter users name. To cancel press ENTER:",
  },
];
const recordQuestions = [
  {
    type: "list",
    name: "gender",
    message: "Enter your Gender",
    choices: ["male", "female"],
  },
  {
    type: "number",
    name: "age",
    message: "Enter your age: ",
  },
];
const searchingQestions = [
  {
    type: "confirm",
    name: "confirmAction",
    message: "Would you to search values in DB?",
    default: true,
  },
  {
    type: "input",
    name: "name",
    message: "Enter users name you wanna find in DB",
  },
];
module.exports = { startingQuestion, recordQuestions, searchingQestions };
