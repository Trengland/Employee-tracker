USE employee_db;

INSERT INTO department (name)
VALUES
    ('Customer Service'),
    ('Sales'),
    ('Assembly'),
    ('IT');

INSERT INTO role (title, salary, department_id)
VALUES  
    ('Customer Service Mgr', 65000, 1),
    ('Customer Service Rep', 50000, 1),
    ('Sales Mgr', 85000, 2),
    ('Sales Rep', 55000, 2),
    ('Assembly Mgr', 65000, 3),
    ('Assembly Tech', 45000, 3),
    ('IT Mgr', 95000, 4),
    ('IT Tech', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Tiffany', 'England', 1, null),
    ('Andrew', 'Mason', 2, 1),
    ('John', 'Smith', 3, 2),
    ('Jane', 'Doe', 4, 2),
    ('Sally', 'Jones', 5, 3),
    ('Bob', 'Smith', 6, 3),
    ('Mike', 'Jones', 7, 4),
    ('Mary', 'Smith', 8, 4);
