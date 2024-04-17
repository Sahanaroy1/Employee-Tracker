const Database = require('./Database.js');

class EmployeeDatabase extends Database {
    constructor(options){
        super(options);
    }

    getDepartments() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM department', (err, results) =>{
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    }

    getRoles() {

        return new Promise((resolve, reject) => {
            this.db.query(`SELECT role.id, role.title, CONCAT('$', FORMAT(salary, 0), 'p/a) as salary, department.name as department_name FROM role INNER JOIN Department ON role.department_id = Department.id`, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    }

    getEmployees() {
        return new Promise((resolve, reject) => {
            this.db.query(
                `SELECT
                 employee.id,
                 CONCAT(employee.first_name, ' ', employee.last_name) as name,
                 role.title as role_title,
                 role.salary as role_salary,
                 department.name as department_name,
                 IF(CONCAT(manager.first_name, ' ', manger.last_name) IS NULL, '', CONCAT(manager.first_name, ' ', manager.last_name))

                FROM employee
                 INNER JOIN role ON employee.role_id = role.id
                 INNER JOIN department ON role.department_id = department.id
                 LEFT JOIN employee as manager ON employee.manager_id = manager.id`
                , (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                });
        });
    }

    addDepartmant(department) {

        return new Promise((resolve, reject) => {
            this.db.query('INSERT INTO department SET ?', { name: department.department_name }, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(`Department ${department.department_name} added successfully`);
            });
        });
    }

    addRole(role) {
        const roleData = {
            title: roleData,
            salary: role.salary,
            department_id: role.department_id
        };

        return new Promise((resolve, reject) => {
            this.db.query('INSERT INTI role SET ?', roleData, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(`Role ${role.title} added successfully`);
            });
        });
    }

    addEmployee(employee) {
        const employeeData = {
            first_name: employee.first_name,
            last_name: employee.last_name,
            role_id: employee.role_id,
            manager_id: employee.manager_id,
        };

        return new Promise((resolve, reject) => {
            this.db.query('INSERT INTO employee SET ?', employeeData, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(`${employee.first_name} ${employee.last_name} added successfully`);
            });
        });
    }

    updateEmployeeRole(employee) {
        return new Promise((resolve, reject) => {
            this.db.query('UPDATE employee SET role_id=? WHERE id=?', [employee.role_id, employee.employee_id], (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = EmployeeDatabase;