const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }
    findAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, concat(manager.first_name, " ", manager.last_name) as manager FROM employee left JOIN role on employee.role_id = role.id left JOIN department on role.department_id = department.id left JOIN employee manager on manager.id = employee.manager_id;'
        )
    } //finish up queries
    findAllDepartments() {
        return this.connection.promise().query(
            'SELECT department.id, department.name'
        )
    }
    findAllRoles() {
        return this.connection.promise().query(
            'SELECT role.id, role.title, role.salary, role.department_id'
        )
    }
}


module.exports = new DB(connection)