const inquirer = require("inquirer");
const { generateSetQuery } = require("./query-helpers");
// const asd = require("./asd");
const connection = require("../db/connection");
require('console.table');

async function viewRoles() {
  let roles = await connection.query(`
  select * from role`);
  console.table(roles);
  connection.end();
};

function addRole() {
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter the new role title",
        name: "newTitle",
        validate: answer => {
          let numValidator = answer.match(/^[A-Za-z]+$/);
          if (numValidator) {
            return true;
          }
          return "Please enter valid title that only includes letters";
        }
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "newSalary",
        validate: answer => {
          let numValidator = answer.match(/^[1-9]\d*$/);
          if (numValidator) {
            return true;
          }
          return "Please enter valid salary that only includes digits";
        }
      },
      {
        type: "input",
        message: "Please enter a valid department id",
        name: "newdepartmentId",
        validate: answer => {
          let numValidator = answer.match(/^[1-9]\d*$/);
          if (numValidator) {
            return true;
          }
          return "Please enter valid department ID that only includes digits";
        }
      }]).then((answer) => {
        console.log(answer);
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.newTitle, parseInt(answer.newSalary), parseInt(answer.newdepartmentId)], (req, res) => {
          console.log("ID " + answer.newTitle + "has been added");
          connection.end();
        })
      }).catch((err) => {
        throw err;
      })
  };