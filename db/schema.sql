DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees(
  id INT NOT NULL,
  emp_name VARCHAR(100) NOT NULL,
  dept_name VARCHAR(50) NOT NULL,
  hourly_wage INT NOT NULL,
  currently_employed BOOLEAN
);

CREATE TABLE employee_score(
  id INT NOT NULL,
  emp_name VARCHAR(100) NOT NULL,
  dept_name VARCHAR(50) NOT NULL,
  emp_score INT (10) NOT NULL
);

