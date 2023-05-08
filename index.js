// This is the main entry point for your application. 
// It should require the necessary dependencies and start the application. 
// You can also define the CLI interface here.

const inquirer = require('inquirer');
const db = require('./db');


// Inquirer prompts
function mainMenuPrompt()  {
    inquirer.prompt(
        {
          type: 'list',
  name: 'mainMenuChoice',
  message: 'What would you like to do?',
  choices: [
    'View all employees',
    'View all departments',
    'View all roles',
    'Add employee',
    'Add department',
    'Add role',
    'Remove employee',
    'Remove department',
    'Remove role',
    'Update employee role',
    'Update employee manager',
    'View department budgets',
    'Quit'
  ]   
})
.then((answer) => {
    let choice = answer.mainMenuChoice;
    switch (choice) {
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'Add employee':
            addEmployee();
            break;
        case 'Add department':
            addDepartment();
            break;
        case 'Add role':
            addRole();
            break;
        case 'Remove employee':
            removeEmployee();
            break;
        case 'Remove department':
            removeDepartment();
            break;
        case 'Remove role':
            removeRole();
            break;
        case 'Update employee role':
            updateEmployeeRole();
            break;
        case 'Update employee manager':
            updateEmployeeManager();
            break;
        case 'View department budgets':
            viewDepartmentBudgets();
            break;
        default:
            quit();
    }
});
}

// const addEmployeePrompt = [
//   {
//     type: 'input',
//     name: 'firstName',
//     message: 'Enter employee first name:'
//   },
//   {
//     type: 'input',
//     name: 'lastName',
//     message: 'Enter employee last name:'
//   },
//   {
//     type: 'list',
//     name: 'roleId',
//     message: 'Choose employee role:',
//     choices: async function() {
//       const roles = await db.findAllRoles();
//       return roles.map(role => ({ name: role.title, value: role.id }));
//     }
//   }
// ];

function viewAllEmployees() {
    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => mainMenuPrompt());
}


function viewAllDepartments() {
        db.findAllDepartments()
          .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
          })
          .then(() => mainMenuPrompt());
}


function viewAllRoles() {
        db.findAllRoles()
          .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
          })
          .then(() => mainMenuPrompt());
} 


function addEmployee() {
        inquirer.prompt([
            {
              name: "first_name",
              message: "What is the employee's first name?",
            },
            {
              name: "last_name",
              message: "What is the employee's last name?",
            },
          ])
          .then((answer) => {
            let firstName = answer.first_name;
            let lastName = answer.last_name;
            db.findAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));
                inquirer.prompt({
                    type: "list",
                    name: "roleId",
                    message: "What is the employee's role?",
                    choices: roleChoices
                })
                .then((roleChoice) => {
                    let roleId = roleChoice.roleId;
                    db.findAllEmployees()
                    .then(([rows]) => {
                        let employees = rows;
                        const managerChoices = employees.map(({ id, first_name, last_name }) => ({  
                            name: `${first_name} ${last_name}`,
                            value: id
                        }));
                        managerChoices.unshift({ name: "None", value: null });
                        inquirer.prompt({
                            type: "list",
                            name: "managerId",
                            message: "Who is the employee's manager?",
                            choices: managerChoices
                        })
                        .then((managerChoice) => {
                            let employee = {
                                manager_id: managerChoice.managerId,
                                role_id: roleId,
                                first_name: firstName,
                                last_name: lastName
                            }
                            db.createEmployee(employee);
                        }
                        )
                        .then(() => console.log(
                            `Added ${firstName} ${lastName} to the database`
                        ))
                        .then(() => mainMenuPrompt())
                    })
                })
            }
          )
        })
}


function addDepartment() {
        inquirer.prompt({
            name: "name",
            message: "What is the name of the department?"
          })
          .then((answer) => {
            db.createDepartment(answer.name)
              .then(() => console.log(`\nDepartment ${answer.name} has been added.\n`))
              .then(() => mainMenuPrompt());
          });
}


function addRole() {
        db.findAllDepartments()
            .then(([rows]) => {
                let departments = rows;
                const departmentChoices = departments.map(({ id, name }) => ({
                    name: name,
                    value: id
                }));
                inquirer.prompt([
                    {
                        name: "title",
                        message: "What is the name of the role?"
                    },
                    {
                        name: "salary",
                        message: "What is the salary of the role?"
                    },
                    {
                        type: "list",
                        name: "department_id",
                        message: "Which department does the role belong to?",
                        choices: departmentChoices
                    }
                ])
                .then(role => {
                    db.createRole(role)
                    .then(() => console.log(`\nRole ${role.title} has been added.\n`))
                    .then(() => mainMenuPrompt())
                })
            }
        )
}


function removeEmployee() {
        db.findAllEmployees()
            .then(([rows]) => {
                let employees = rows;
                const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));
                inquirer.prompt([
                    {
                        type: "list",
                        name: "employeeId",
                        message: "Which employee do you want to remove?",
                        choices: employeeChoices
                    }
                ])
                .then((answer) => {
                    let employeeId = answer.employeeId;
                    db.removeEmployee(employeeId)
                    .then(() => console.log("Removed employee from the database"))
                    .then(() => mainMenuPrompt())
                })
            })
}


function removeDepartment() {
        db.findAllDepartments()
            .then(([rows]) => {
                let departments = rows;
                const departmentChoices = departments.map(({ id, name }) => ({
                    name: name,
                    value: id
                }));
                inquirer.prompt([
                    {
                        type: "list",
                        name: "departmentId",
                        message:
                            "Which department do you want to remove? (Warning: This will also remove associated roles and employees)",
                        choices: departmentChoices
                    }
                ])
                .then((answer) => {
                    let departmentId = answer.departmentId;
                    db.removeDepartment(departmentId)
                    .then(() => console.log("Removed department from the database"))
                    .then(() => mainMenuPrompt())
                })
            })
}


function removeRole() {
        db.findAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));
                inquirer.prompt([
                    {
                        type: "list",
                        name: "roleId",
                        message: "Which role do you want to remove? (Warning: This will also remove associated employees)",
                        choices: roleChoices
                    }
                ])
                .then((answer) => {
                    let roleId = answer.roleId;
                    db.removeRole(roleId)
                    .then(() => console.log("Removed role from the database"))
                    .then(() => mainMenuPrompt())
                })
            })
}


function updateEmployeeRole() {
        db.findAllEmployees()
          .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
            inquirer.prompt([
              {
                name: "employeeId",
                message: "Which employee's role do you want to update?",
                type: "list",
                choices: employeeChoices
              },
              
            ])
            .then((answer) => {
                let employeeId = answer.employeeId;
                db.findAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                    }));
                    inquirer.prompt([
                    {
                        name: "roleId",
                        message: "Which role do you want to assign the selected employee?",
                        type: "list",
                        choices: roleChoices
                    }
                    ])
                    .then((answer) => {
                    let roleId = answer.roleId;
                    db.updateEmployeeRole(employeeId, roleId);
                    })
                    .then(() => console.log("Updated employee's role"))
                    .then(() => mainMenuPrompt())
                });
            });
          });
}


function updateEmployeeManager() {
        db.findAllEmployees()
            .then(([rows]) => {
                let employees = rows;
                const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));
                inquirer.prompt([
                    {
                        name: "employeeId",
                        message: "Which employee's manager do you want to update?",
                        type: "list",
                        choices: employeeChoices
                    },
                    {
                        name: "managerId",
                        message: "Who is the employee's new manager?",
                        type: "list",
                        choices: employeeChoices
                    }
                ])
                .then((answer) => {
                    let employeeId = answer.employeeId;
                    let managerId = answer.managerId;
                    db.updateEmployeeManager(employeeId, managerId)
                    .then(() => console.log("Updated employee's manager"))
                    .then(() => mainMenuPrompt())
                })
            })
}


function viewDepartmentBudgets() {
        db.findAllDepartments()
            .then(([rows]) => {
                let departments = rows;
                const departmentChoices = departments.map(({ id, name }) => ({
                    name: name,
                    value: id
                }));
                inquirer.prompt([
                    {
                        name: "departmentId",
                        message: "Which department's budget do you want to view?",
                        type: "list",
                        choices: departmentChoices
                    }
                ])
                .then((answer) => {
                    let departmentId = answer.departmentId;
                    db.viewDepartmentBudgets(departmentId)
                    .then(([rows]) => {
                        let departmentBudget = rows;
                        console.log(`\n`);
                        console.table(departmentBudget);
                        console.log(`\n`);
                    })
                    .then(() => mainMenuPrompt())
                })
            })
}


// Call the main menu function to start the application
mainMenuPrompt();
