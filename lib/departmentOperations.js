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

module.exports = {
    viewDepartments,
    // addDepartment,
    // updateDepartment,
    // deleteDepartment,
  };