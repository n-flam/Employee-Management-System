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









module.exports = {
    viewEmployees,
    // addEmployee,
    // updateEmployee,
    // deleteEmployee,
  };