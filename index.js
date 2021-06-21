// Declare npm dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require("chalk");
const consoleTable = require("console.table");

// Declare variables
const openingMessage =  chalk.cyanBright(
`    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                     Employee Tracker
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
);

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
});

// -----------------------------------------|
//                Functions                 | 
// -----------------------------------------|

// Opening Menu Function
function openingMenu() {
    console.log(openingMessage);
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
                ]
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
            case "View Employee by Manager":
                viewEmployeeByManager();
                break;
            case "View Total Utilized Budget of a Department":
                viewTotalBudget();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
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
            case "Delete Employee":
                deleteEmployee();
                break;
            case "Exit":
                console.log(chalk.cyanBright("Have a great day!"))
                connection.end();
                break;
        }
    })
};

// View all Departments
function viewDepartments()  {
    connection.query("SELECT * FROM department", function(error, result) {
        if (error) throw error;
        console.log(chalk.cyanBright("\n All Departments in Database \n"));
        console.table(result);
        console.log(chalk.cyanBright("\n Press up or down arrow key to see the main menu \n"));
    });
    openingMenu();
}

// View all Employee Roles
function viewEmployeeRoles() {
    connection.query("SELECT * FROM employee_role", function(error, result) {
        if (error) throw error;
        console.log(chalk.cyanBright("\n All Employee Roles in Database \n"));
        console.table(result);
        console.log(chalk.cyanBright("\n Press up or down arrow key to see the main menu \n"));
    });
    openingMenu();
}

// View all Employees 
function viewAllEmployees() {
    const specialQuery = "";
    connection.query(specialQuery, function(error, result) {
        if (error) throw error;
        console.log(chalk.cyanBright("\n All Employees in Database \n"));
        console.table(result);
        console.log(chalk.cyanBright("\n Press up or down arrow key to see the main menu \n"));
    });
    openingMenu();
}

// Orders.CustomerID=Customers.CustomerID;

// View Employee by Manager
function viewEmployeeByManager() {

}
// View Total Utilized Budget of a Department
function viewTotalBudget() {

}

// Update Employee Roles
function updateEmployeeRole() {

}

// Update Employee Managers
function updateEmployeeManager() {

}

// Add Departments
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "Enter the new department name"
        }
    ]).then(function(answer) {
        let addNewDepartment = "INSERT INTO department (department_name) VALUE (?)"
        connection.query(addNewDepartment, answer.newDepartment, (error, response) => {
            if (error) throw error
            console.log(answer.newDepartment + " Department Successfully Created");
            viewDepartments();
        })
    })
};

// Add Employee Roles
// function addEmployeeRole() {
//     connection.query("SELECT employee_role.title as Title, employee_role.salary AS Salary FROM employee_role", function (error, answer) {
//         inquirer.prompt([
//             {
//             type: "input",
//             name: "title",
//             message: "What is the employee role?"
//             },
//             {
//             type: "input",
//             name: "salary",
//             message: "What is the salary for this role?"
//             }
//         ]).then(function(answer) {
//             connection.query("INSERT INTO employee_role SET ?",
//             {
//                 title: answer.title,
//                 salary: resizeBy.salary,
//             },
//             )
//         })
//     })
// }

// Add Employee
function addEmployee() {

}

// Delete Departments
function deleteDepartment() {

}

// Delete Employee Roles
function deleteEmployeeRole() {

}

// Delete Employee
function deleteEmployee() {

}







// -----------------------------------------|
//             Call Function                | 
// -----------------------------------------|

openingMenu();