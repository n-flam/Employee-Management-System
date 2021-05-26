const inquirer = require("inquirer");
const { generateSetQuery } = require("./query-helpers");
// const asd = require("./asd");
const connection = require("../db/connection");
require('console.table');

async function viewDepartments() {
    let departments = await connection.query(`
    select * from department`);
    console.table(departments);
    connection.end();
  };

  function addDepartment() {
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter the new department name",
        name: "newName",
        validate: answer => {
          let numValidator = answer.match(/^[A-Za-z]+$/);
          if (numValidator) {
            return true;
          }
          return "Please enter valid department name that only includes letters";
        }
      }]).then((answer) => {
        console.log(answer);
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.newName], (req, res) => {
          console.log("ID " + answer.newName + " has been added");
          connection.end();
        }).catch((err) => {
          throw err;
        })
      })
  };
  

module.exports = {
    viewDepartments,
    addDepartment,
    // updateDepartment,
    // deleteDepartment,
  };