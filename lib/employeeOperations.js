const inquirer = require("inquirer");
const { generateSetQuery } = require("./query-helpers");
// const asd = require("./asd");
const connection = require("../db/connection");
require('console.table');

async function viewEmployees() {
    let employees = await connection.query(`
    select first_name AS FirstName, last_name AS Surname, title AS JobTitle, salary AS AnnualSalary, name AS Department 
    from employee 
    inner join role on employee.role_id = role.id 
    inner join department on role.department_id = department.id`);
    console.table(employees);
    connection.end();
  };

  function addEmployee() {
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter the first name of new employee",
        name: "newFirstName",
        validate: answer => {
          let numValidator = answer.match(/^[A-Za-z]+$/
          );
          if (numValidator) {
            return true;
          }
          return "Please enter first name using only letters";
        }
      },
      {
        type: "input",
        message: "Please enter the last name of new employee",
        name: "newLastName",
        validate: answer => {
          let numValidator = answer.match(/^[A-Za-z]+$/
          );
          if (numValidator) {
            return true;
          }
          return "Please enter last name using only letters";
        }
      },
      {
        type: "input",
        message: "Please enter a new valid roleID",
        name: "newRoleId",
        validate: answer => {
          let numValidator = answer.match(/^[1-9]\d*$/);
          if (numValidator) {
            return true;
          }
          return "Please enter valid role that only includes digits";
        }
      },
      {
        type: "input",
        message: "Please enter a new valid Manager ID",
        name: "newManagerId",
        validate: answer => {
          let numValidator = answer.match(/^[1-9]\d*$/);
          if (numValidator) {
            return true;
          }
          return "Please enter valid Manager ID that only includes digits";
        }
      }]).then((answer) => {
        console.log(answer);
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.newFirstName, answer.newLastName, parseInt(answer.newRoleId), parseInt(answer.newManagerId)], (req, res) => {
          console.log("ID " + answer.newFirstName + "has been added");
          connection.end();
          return res;
        })
      })
  };

  async function updateEmployee() {
    let employee = await connection.query("select id, last_name, first_name from employee");
    const choices = employee.map(({ id, first_name, last_name }) => ({
      name: ("ID " + id + " Name: " + first_name + " " + last_name),
      value: id
    }));
    inquirer.prompt([
      {
        type: "list",
        message: "What would you like do?",
        choices: choices,
        name: "id",
      }]).then((employees) => {
        updateEmployeeDetails(employees.id);
      }).catch((err) => {
        throw err;
      });
  };


  function updateEmployeeDetails(employeeId) {
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter a new first name?",
        name: "newFirstName",
        validate: answer => {
          let numValidator = answer.match(/^[A-Za-z]+$/
          );
          if (numValidator) {
            return true;
          }
          return "Please enter first name using only letters";
        }
      },
      {
        type: "input",
        message: "Please enter a new valid last name?",
        name: "newLastName",
        validate: answer => {
          let numValidator = answer.match(/^[A-Za-z]+$/
          );
          if (numValidator) {
            return true;
          }
          return "Please enter last name using only letters";
        }
      },
      {
        type: "input",
        message: "Please enter a new valid roleID?",
        name: "newRoleId",
        validate: answer => {
          let numValidator = answer.match(/^[1-9]\d*$/);
          if (numValidator) {
            return true;
          }
          return "Please enter valid role ID that only includes digits";
        }
      },
      {
        type: "input",
        message: "Please enter a new valid Manager ID?",
        name: "newManagerId",
        validate: answer => {
          let numValidator = answer.match(/^[1-9]\d*$/);
          if (numValidator) {
            return true;
          }
          return "Please enter valid Manager ID that only includes digits";
        }
      }]).then((employee) => {
        const payload = {
          first_name: employee.newFirstName,
          last_name: employee.newLastName,
          role_id: employee.newRoleId,
          manager_id: employee.newManagerId,
        };
  
        console.log(payload.manager_id);
        const setQuery = generateSetQuery(payload)
        connection.query(`update employee set ${setQuery} where id = ?`, [
          ...Object.values(payload).filter((val) => val !== ""),
          employeeId
        ]).then((res) => {
          console.log({ res });
          console.log("ID " + employeeId + "has been updated");
          connection.end();
        }).catch((err) => {
          throw err;
        })
      })
  };
  
  async function deleteEmployee() {
    let employee = await connection.query("select id, last_name, first_name from employee");
    const choices = employee.map(({ id, first_name, last_name }) => ({
      name: ("ID " + id + " Name: " + first_name + " " + last_name),
      value: id
    }));
    inquirer.prompt([
      {
        type: "list",
        message: "Which employee would you like to delete?",
        choices: choices,
        name: "id",
      }]).then((employees) => {
            const idToDelete = employees.id;
            connection.query("delete from employee where id = ?", [idToDelete], () => {
              console.log("ID " + idToDelete + "has been deleted");
            })
            connection.end();
          })
      
  };



module.exports = {
    viewEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };