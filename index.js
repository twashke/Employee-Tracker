// Declare npm dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require("chalk");
const consoleTable = require("console.table");
const figlet = require("figlet");
const clear = console.clear();

// Enable access to .env variables
require('dotenv').config();

// Create connection to mysql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Username from .env file
    user: process.env.DB_USER,
    // Password from .env file
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to mysql database
connection.connect((err) => {
    if (err) throw err;
    // Opening Title
    console.log(chalk.cyanBright(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`));
    console.log("");
    console.log(chalk.cyanBright.bold(figlet.textSync("Employee Tracker")));
    console.log("");
    console.log("                                 " + chalk.magenta("by Tiffany Washke"));
    console.log("");
    console.log(chalk.cyanBright(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`));
    openingMenu();
});

// -----------------------------------------|
//          Opening Menu Function           | 
// -----------------------------------------|

// Opening Menu Function
function openingMenu() {
    inquirer.prompt([
        {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
                    "View all Departments",
                    "View all Employees Roles",
                    "View all Employees",
                    "View Employee by Manager",
                    "View Total Utilized Budget of a Department",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "Add Department",
                    "Add Employee Role",
                    "Add Employee",
                    "Delete Department",
                    "Delete Employee Role",
                    "Delete Employee",
                    "Exit",
                ],
        },
    ]).then(function(answer) {
        switch(answer.choice) {
            case "View all Departments":
                viewDepartments();
                break;
            case "View all Employees Roles":
                viewEmployeeRoles();
                break;
            case "View all Employees":
                viewAllEmployees();
                break;
            // case "View Employee by Manager":
            //     viewEmployeeByManager();
            //     break;
            // case "View Total Utilized Budget of a Department":
            //     viewTotalBudget();
            //     break;
            // Working
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            // case "Update Employee Manager":
            //     updateEmployeeManager();
            //     break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Employee Role":
                addEmployeeRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            case "Delete Employee Role":
                deleteEmployeeRole();
                break;
            // case "Delete Employee":
            //     deleteEmployee();
                break;
            case "Exit":
                console.log(chalk.cyanBright.bold(figlet.textSync("Session Ended, Thank You!")));
                connection.end();
                break;
        }
    })
};

// -----------------------------------------|
//             View Functions               | 
// -----------------------------------------|

// View all Departments
function viewDepartments() {
    connection.query("SELECT * FROM department", function(error, result) {
        if (error) throw error;
        console.log("");
        console.log(chalk.bgMagenta("     All Departments in Database   "));
        console.log(chalk.cyanBright(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`));
        console.table(result);
        console.log(chalk.cyanBright("~~~~~~~~~~~ Employee Tracker Menu ~~~~~~~~~~~"));
        openingMenu();
    });
}

// View all Employee Roles
function viewEmployeeRoles() {
    const specialQuery = `SELECT employee_role.id, employee_role.title, employee_role.salary, department.department_name 
    FROM employee_role INNER JOIN department ON department.id = employee_role.department_id;`
    connection.query(specialQuery, function(error, result) {
        if (error) throw error;
        console.log("");
        console.log(chalk.bgMagenta("     Employee Roles in Database     "));
        console.log(chalk.cyanBright(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`));
        console.table(result);
        console.log(chalk.cyanBright("~~~~~~~~~~~ Employee Tracker Menu ~~~~~~~~~~~"));
        openingMenu();
    });
}

// View all Employees 
function viewAllEmployees() {
    const specialQuery = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, 
    department.department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee 
    INNER JOIN employee_role on employee_role.id = employee.employee_role_id 
    INNER JOIN department on department.id = employee_role.department_id 
    left join employee e on employee.employee_manager_id = e.id`;
    connection.query(specialQuery, function(error, result) {
        if (error) throw error;
        console.log("");
        console.log(chalk.bgMagenta("      Employees in Database      "));
        console.log(chalk.cyanBright(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`));
        console.table(result);
        console.log(chalk.cyanBright("~~~~~~~~~~~ Employee Tracker Menu ~~~~~~~~~~~"));
        openingMenu();
    });
}

// -----------------------------------------|
//           Update Functions               | 
// -----------------------------------------|

// Update Employee Roles
function updateEmployeeRole() {
    let updateRole = `SELECT * FROM employee`
    getRole();
    connection.query(updateRole, (error, result) => {
        inquirer.prompt([
            {
            type: "list",
            name: "updateEmployee",
            message: "Choose an employee to update their role",
            choices: function () {
                let choiceArr = []
                result.forEach(({id, first_name, last_name}) => {
                    choiceArr.push(`${id} ${first_name} ${last_name}`);
                });
                return choiceArr;
            },
            },
            {
            type: "list",
            name: "newRole",
            message: "What is the new role of the employee?",
            choices: function () {
                let newroleArr = []
                roleArr.forEach(({id, title}) => {
                    newroleArr.push(`${id} ${title}`);
                });
                return newroleArr;
            }
            },
        ]).then(function(answer) {
            connection.query(`UPDATE employee SET employee_role_id = ${answer.newRole[0]} WHERE id = ${answer.updateEmployee[0]}`,
            (error, result) => {
                if (error) throw error
                console.log("");
                console.log(chalk.bgCyan("Employee Role Successfully Updated"));
            });
            viewAllEmployees();
        });
    });
};

// // // Update Employee Managers
// // function updateEmployeeManager() {
// //     viewEmployeeByManager();
// // }

// // -----------------------------------------|
// //              Add Functions               | 
// // -----------------------------------------|

// Add Departments
function addDepartment() {
    let addNewDepartment = "INSERT INTO department (department_name) VALUE (?)"
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "Enter the new department name",
        }
    ]).then(function(answer) {
        connection.query(addNewDepartment, answer.newDepartment, (error) => {
            if (error) throw error
            console.log("");
            console.log(chalk.bgCyan("Department Successfully Created"));
        })
        viewDepartments();
    })
};

// Add Employee Roles
function addEmployeeRole() {
    let addNewRole = "SELECT employee_role.title as Title, employee_role.salary AS Salary FROM employee_role";
    getDepartments();
    connection.query(addNewRole, (error, result) => {
        if (error) throw error;
        const deptName = departmentArr.map((department) => {
            return department.department_name;
        })
        inquirer.prompt([
            {
            type: "input",
            name: "Title",
            message: "What is the employee role?",
            },
            {
            type: "input",
            name: "Salary",
            message: "What is the salary for this role?",
            },
            {
            type: "list",
            name: "DepartmentID",
            message: "What Department does this new role belong to?",
            choices: deptName,
            }
        ]).then(function(answer) {
            const dept = departmentArr.find((department) => {
                return department.department_name === answer.DepartmentID;
            })
            connection.query("INSERT INTO employee_role SET ?",
            {
                title: answer.Title,
                salary: answer.Salary,
                department_id: dept.id
            }, 
            function (error) {
                if (error) throw error
                console.log("");
                console.log(chalk.bgCyan("Employee Role Successfully Created"));
            })
            viewEmployeeRoles();
        })
    });
};

function addEmployee() {
    getRole();
    const manager = `SELECT * FROM employee`;
    connection.query(manager, (error, result) => {
        if (error) throw error;
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter the employee's first name!",
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter the employee's last name!",
        },
        {
            type: "list",
            name: "roleTitle",
            message: "What is the employee's role?",
            choices: function () {
                let newRoleArr = []
                roleArr.forEach(({id, title}) => {
                    newRoleArr.push(`${id} ${title}`);
                });
                return newRoleArr;
            },
        },
        {
            type: "list",
            name: "empManager",
            message: "Who is the employee's manager?",
            choices: function () {
                let managerArr = []
                result.forEach(({id, first_name, last_name}) => {
                    managerArr.push(`${id} ${first_name} ${last_name}`);
                });
                return managerArr;
            },
        },
    ]).then(function(answer) {
        connection.query(`INSERT employee SET ?`, 
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            employee_role_id: answer.roleTitle[0],
            employee_manager_id: answer.empManager[0],
        },
        (error, result) => {
            if (error) throw error
            console.log("");
            console.log(chalk.bgCyan("New Employee Successfully Added!"));
        });
        viewAllEmployees();
    })
});
}

// -----------------------------------------|
//           Delete Functions               | 
// -----------------------------------------|

// Delete Departments
function deleteDepartment() {
    let departments = [];
    let departmentId;
    let currentDepartments = "SELECT department.id, department.department_name FROM department";
    let departmentToDelete = "DELETE FROM department WHERE department.id = ?";
    
    connection.query(currentDepartments, (error, response) => {
        if (error) throw error;
        response.forEach((department) => {departments.push(department.department_name)
    });
    inquirer.prompt([
        {
            type: "list",
            name: "deleteDepartment",
            message: "Which department would you like to delete?",
            choices: departments
        }
    ]).then((answer) => {
        response.forEach((department) => {
            if (answer.deleteDepartment === department.department_name) {
                departmentId = department.id;
            }
        });
        connection.query(departmentToDelete, [departmentId], (error) => {
            if (error) throw error
            console.log("");
            console.log(chalk.bgCyan("Department Successfully Removed"));
        });
        viewDepartments();
    });
});
};

// Delete Employee Roles
function deleteEmployeeRole() {
    let employeeRole = [];
    let employeeRoleId;
    let currentEmployeeRoles = "SELECT employee_role.id, employee_role.title FROM employee_role";
    let employeeToDelete = "DELETE FROM employee_role WHERE employee_role.id = ?";
    
    connection.query(currentEmployeeRoles, (error, response) => {
        if (error) throw error;
        response.forEach((employee_role) => {employeeRole.push(employee_role.title)
    });
    inquirer.prompt([
        {
            type: "list",
            name: "deleteEmployeeRole",
            message: "Which Employee Role would you like to delete?",
            choices: employeeRole
        }
    ]).then((answer) => {
        response.forEach((employee_role) => {
            if (answer.deleteEmployeeRole === employee_role.title) {
                employeeRoleId = employee_role.id;
            }
        });
        connection.query(employeeToDelete, [employeeRoleId], (error) => {
            if (error) throw error
            console.log("");
            console.log(chalk.bgCyan("Employee Role Successfully Removed"));

        });
        viewEmployeeRoles();
    });
});
};

// // Delete Employee
// function deleteEmployee() {
//     let employee = [];
//     let employeeRoleId;
//     let currentEmployees = "SELECT CONCAT employee.first_name, employee.last_night, CONCAT(e.first_name, ' ' ,e.last_name) FROM employee";
//     let employeeToDelete = "DELETE FROM employee WHERE employee_role.id = ?";
    
//     connection.query(currentEmployees, (error, response) => {
//         if (error) throw error;
//         response.forEach((employee) => {employee.push(employee_role.title)
//     });
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "deleteEmployee",
//             message: "Which Employee would you like to delete?",
//             choices: currentEmployees
//         }
//     ]).then((answer) => {
//         response.forEach((employee_role) => {
//             if (answer.employeeToDelete === employee_role.title) {
//                 employeeRoleId = employee_role.id;
//             }
//         });
//         connection.query(employeeToDelete, [employeeRoleId], (error) => {
//             if (error) throw error
//             console.log(chalk.bgCyan("Employee Role Successfully Removed"));
//             viewEmployeeRoles();
//         });
//     });
// });
// }



// -----------------------------------------|
//      Misc Functions for Functions        | 
// -----------------------------------------|
let departmentArr = [];
// Select Department Query for Add New Role
function getDepartments() {
    connection.query('SELECT id, department_name FROM department ORDER BY department_name', (error, result) => {
        if(error) throw error;
        departmentArr = result;
    })
};

let roleArr = [];
// Select Role Query for Add New Employee
function getRole() {
    connection.query('SELECT id, title FROM employee_role', (error, result) => {
        if(error) throw error;
        roleArr = result;
    })
}


