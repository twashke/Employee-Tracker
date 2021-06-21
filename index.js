// Declare npm dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require("chalk");
const consoleTable = require("console.table");

// Declare variables
const openingMessage =  chalk.magenta.bold(
`    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                     Employee Tracker
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
);

// Enable access to .env variables
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
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
    console.log(openingMessage);
});






