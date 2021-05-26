const inquirer = require("inquirer");

function baseSelection() {
    console.log("base");
    return inquirer.prompt([
          {
            type: "list",
            message: "What do you want to do?",
            choices: ["Manage Employee information", "Manage roles", "Manage departments"],
            name: "preSelection",
          }])
            
};

module.exports = baseSelection;