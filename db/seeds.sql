INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Legal');
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Finance');

INSERT INTO role (id, title, salary, department_id) VALUES (1, 'Software Engineer', 180000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (2, 'Lead Engineer', 200000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (3, 'Legal Team Lead', 200000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (4, 'Lawyer', 180000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (5, 'Sales Lead', 100000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (6, 'Salesperson' 80000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (7, 'Accountant' 150000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, 'John', 'Deacon', 5, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, 'Joseph', 'Nooney', 6, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, 'Jaco', 'Pastorius', 3, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, 'Mark', 'King', 1, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5, 'Marcus', 'Miller', 7, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (6, 'Clark', 'Stanley', 3, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (7, 'Victor', 'Street', 4, 6);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (8, 'Smith', 'Flea', 6, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (9, 'Burton', 'Cliff', 1, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (10, 'Lynn', 'Phil', 4, 6);
