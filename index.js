Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@n-flam 
marcojansen-gmx
/
Employee_tracking_tool
1
00
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Employee_tracking_tool/index.js /
@marcojansen-gmx
marcojansen-gmx all employeeOperations bugfixed
Latest commit 6a1d2a7 on 17 Feb
 History
 1 contributor
39 lines (33 sloc)  1.37 KB
  
const selectTask = require("./lib/inquirer-helpers");
const {addEmployee, viewEmployees, deleteEmployee, updateEmployee} = require("./lib/employeeOperations");
const {addRole, viewRoles, deleteRole, updateRole} = require("./lib/roleOperations");
const {addDepartment, viewDepartments, deleteDepartment, updateDepartment} = require("./lib/departmentOperations");

const employeeOperations = {
    'Show all employees': viewEmployees,
    'Add new employee': addEmployee,
    'Update existing employee': updateEmployee,
    'Delete existing employee': deleteEmployee,
    'Back to task selection': baseSelection,  
  }
  
  const roleOperations = {
    'Show all roles': viewRoles,
    'Add new role': addRole,
    'Update existing role': updateRole,
    'Delete existing role': deleteRole,
    'Back to task selection': baseSelection,
  };
  
  const departmentOperations = {
    'Show all departments': viewDepartments,
    'Add new department': addDepartment,
    'Update existing department': updateDepartment,
    'Delete existing department': deleteDepartment,
    'Back to task selection': baseSelection,
  };

  function baseSelection() {
    selectTask({
      "Manage Employee information": () => selectTask(employeeOperations), 
      "Manage roles": () =>  selectTask(roleOperations), 
      "Manage departments": () =>  selectTask(departmentOperations),
    })
   
  };

  baseSelection();
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete