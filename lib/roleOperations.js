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
  async function updateRole() {
    let role = await connection.query("select id, title, salary from role");
    const choices = role.map(({ id, title, salary }) => ({
      name: ("ID " + id + " Title: " + title + " Salary: " + salary),
      value: id
    }));
    inquirer.prompt([
      {
        type: "list",
        message: "Which role do you want to update?",
        choices: choices,
        name: "id",
      }]).then((roles) => {
        updateRoleDetails(roles.id);
      }).catch((err) => {
        throw err;
      });
  };

  function updateRoleDetails(roleId) {
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter a new Title?",
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
        message: "Please enter Salary amount?",
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
        message: "Which department belongs the new role to?",
        name: "newDepartmentId",
        validate: answer => {
          let numValidator = answer.match(/^[1-9]\d*$/);
          if (numValidator) {
            return true;
          }
          return "Please enter valid department ID that only includes digits";
        }
      }]).then((role) => {
        const payload = {
          title: role.newTitle,
          salary: role.newSalary,
          department_id: role.newDepartmentId,
        };
  
        const setQuery = generateSetQuery(payload)
        connection.query(`update role set ${setQuery} where id = ?`, [
          ...Object.values(payload),
          roleId
        ]).then((res) => {
          console.log("ID " + roleId + "has been updated");
          connection.end();
        }).catch((err) => {
          throw err;
        })
      })
  };

  async function deleteRole() {
    let role = await connection.query("select id, title, salary from role");
    const choices = role.map(({ id, title, salary }) => ({
      name: ("ID " + id + " Name: " + title + " " + salary),
      value: id
    }));
    inquirer.prompt([
      {
        type: "list",
        message: "Which role you want to delete (Please keep in mind that roles which are currently in use, won't be deleted)?",
        choices: choices,
        name: "id",
      }]).then((roles) => {
        const idToDelete = roles.id;
        connection.query("delete from role where id = ?", [idToDelete], () => {
          console.log("ID " + idToDelete + "has been deleted");
        })
        connection.end();
      })
  };

  module.exports = {
    viewRoles,
    addRole,
    updateRole,
    deleteRole,
  };
  
  