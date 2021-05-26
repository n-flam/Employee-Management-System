const inquirer = require("inquirer");

/**
 * 
 * @param {object} operations 
 */
function selectTask(operations) {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like do?",
      choices: Object.keys(operations),
      name: "operation",
    }])
    .then((data) => {
      const selected = data.operation;
      operations[selected]();
    })
    .catch((err) => {
      console.error(err);
    })
};

module.exports = selectTask;