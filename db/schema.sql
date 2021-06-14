DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employeeDepartment (
    id INT NOT NULL AUTO_INCREMENT,
    employee_name VARCHAR(30) NOT NULL,
    primary key(id)
);

CREATE TABLE employeeRole (
    id INT NOT NULL AUTO_INCREMENT,
    employee_title VARCHAR(30) NOT NULL,
    employee_salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    primary key (id)
);

CREATE TABLE employeeInfo (
    id INT NOT NULL AUTO_INCREMENT,
    employee_firstName VARCHAR(30) NOT NULL,
    employee_lastName VARCHAR(30) NOT NULL,
    employee_role_id INT NOT NULL,
    employee_manager_id INT NULL,
    primary key (id)
);