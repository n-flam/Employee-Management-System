INSERT INTO department (name) VALUES ('Department1');
INSERT INTO department (name) VALUES ('Department2');

INSERT INTO role (title, salary, department_id) VALUES ('Manager', '87000', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Manager', '74000', '2');
INSERT INTO role (title, salary, department_id) VALUES ('Engineer1', '61000', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Engineer2', '59000', '2');

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ben', 'Global', '1', '1');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Berta', 'Beta', '2', '2');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Simon', 'Dough', '3', '1');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Luca', 'Halfman', '4', '2');