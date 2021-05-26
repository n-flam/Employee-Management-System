DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

 CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary INT NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);
 
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    role_id int NOT NULL,
    manager_id int,
   	FOREIGN KEY (role_id) REFERENCES role(id),
    PRIMARY KEY (id)
);