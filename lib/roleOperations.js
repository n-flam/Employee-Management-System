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