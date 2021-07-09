-- Department Seeds

INSERT INTO department (department_name)
VALUE ("Prepress");
INSERT INTO department (department_name)
VALUE ("Project Management");
INSERT INTO department (department_name)
VALUE ("Election Coordinators");
INSERT INTO department (department_name)
VALUE ("Scheduling");
INSERT INTO department (department_name)
VALUE ("Operations");

-- Employee Role Seeds

INSERT INTO employee_role (title, salary, department_id) 
VALUE ("Prepress Lead", 100000, 1);
INSERT INTO employee_role (title, salary, department_id) 
VALUE ("Prepress Operator", 85000, 1);
INSERT INTO employee_role (title, salary, department_id) 
VALUE ("Project Manager Lead", 90000, 2);
INSERT INTO employee_role (title, salary, department_id) 
VALUE ("Project Manager", 75000, 2);
INSERT INTO employee_role (title, salary, department_id) 
VALUE ("Election Coordinator Lead", 90000, 3);
INSERT INTO employee_role (title, salary, department_id) 
VALUE ("Election Coordinator", 75000, 3);
INSERT INTO employee_role (title, salary, department_id)  
VALUE ("Scheduler Lead", 90000, 4);
INSERT INTO employee_role (title, salary, department_id) 
VALUE ("Scheduler", 75000, 4);
INSERT INTO employee_role (title, salary, department_id) 
VALUE ("Operations Manager", 120000, 5);

-- Employee Seeds

INSERT INTO employee (first_name, last_name, employee_manager_id, employee_role_id)
VALUE ("Ryan", "White", 9, 1);
INSERT INTO employee (first_name, last_name, employee_manager_id, employee_role_id)
VALUE ("Brian", "Smith", 1, 2);
INSERT INTO employee (first_name, last_name, employee_manager_id, employee_role_id)
VALUE ("Linda", "Brown", 9, 3);
INSERT INTO employee (first_name, last_name, employee_manager_id, employee_role_id)
VALUE ("Jack", "Williams", 3, 4);
INSERT INTO employee (first_name, last_name, employee_manager_id, employee_role_id)
VALUE ("Debbie", "Johnson", 9, 5);
INSERT INTO employee (first_name, last_name, employee_manager_id, employee_role_id)
VALUE ("Melissa", "Jones", 5, 6);
INSERT INTO employee (first_name, last_name, employee_manager_id, employee_role_id)
VALUE ("Brandon", "Baker", 9, 7);
INSERT INTO employee (first_name, last_name, employee_manager_id, employee_role_id)
VALUE ("Tiffany", "Washke", 7, 8);
INSERT INTO employee (first_name, last_name, employee_manager_id, employee_role_id)
VALUE ("Brad", "Shepard", 9, 9);

