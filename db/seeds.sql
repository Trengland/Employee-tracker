USE employee_db;

INSERT INTO department (name)
VALUES
    ('Customer Service'),
    ('Sales'),
    ('Assembly'),
    ('HR'),
    ('IT');

INSERT INTO role (title, salary, department_id)
VALUES  
    ('Customer Service Mgr', 65000, 1),
    ('Customer Service Rep', 50000, 1),
    ('Sales Mgr', 85000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Tiffany', 'England', 1, null),
    ('Andrew', 'Mason', 2, 1);


    