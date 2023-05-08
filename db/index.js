const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }
    findAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, concat(manager.first_name, " ", manager.last_name) as manager FROM employee left JOIN role on employee.role_id = role.id left JOIN department on role.department_id = department.id left JOIN employee manager on manager.id = employee.manager_id;'
        )
    } 
    findAllDepartments() {
        return this.connection.promise().query(
            'SELECT department.id, department.name FROM department;'
        )
    }
    findAllRoles() {
        return this.connection.promise().query(
            'SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;'
        )
    }
    createEmployee(employee) {
        return this.connection.promise().query(
            'INSERT INTO employee SET ?', employee
        )
    }
    removeEmployee(employeeId) {
        return this.connection.promise().query(
            'DELETE FROM employee WHERE id = ?', employeeId
        )
    }
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            'UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]
        )
    }
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query(
            'UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId]
        )
    }
    createRole(role) {
        return this.connection.promise().query(
            'INSERT INTO role SET ?', role
        )
    }
    removeRole(roleId) {
        return this.connection.promise().query(
            'DELETE FROM role WHERE id = ?', roleId
        )
    }
    createDepartment(department) {
        return this.connection.promise().query(
            'INSERT INTO department SET name = ?', department
        )
    }
    removeDepartment(departmentId) {
        return this.connection.promise().query(
            'DELETE FROM department WHERE id = ?', departmentId
        )
    }
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id WHERE role.department_id = ?', departmentId
        )
    }
    findAllEmployeesByManager(managerId) {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id WHERE employee.manager_id = ?', managerId
        )
    }
    viewDepartmentBudgets() {
        return this.connection.promise().query(
            'SELECT department.id, department.name, SUM(role.salary) AS budget FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY department.id, department.name;'
        )
    }
}


module.exports = new DB(connection)