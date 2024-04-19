const Database = require("./Database.js");

class EmployeeDatabase extends Database {
  constructor(options) {
    super(options);
  }

  getDepartments() {
    return new Promise((resolve, reject) => {
      this.query("SELECT * FROM department", (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.rows);
      });
    });
  }

  getRoles() {
    console.log('test');
    return new Promise((resolve, reject) => {
      this.query(
        `SELECT role.id, role.title, role.salary, department.name as department_name FROM role INNER JOIN Department ON role.department_id = Department.id`,
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results.rows);
        }
      );
    });
  }

  getEmployees() {
    return new Promise((resolve, reject) => {
      this.query(
        `SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id`,
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  addDepartment(department) {
    return new Promise((resolve, reject) => {
      this.query(
        'INSERT INTO department(name) VALUES($1)',
        [ department.department_name ],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(
            `Department ${department.department_name} added successfully`
          );
        }
      );
    });
  }

  addRole(role) {
    const roleData = {
      title: roleData,
      salary: role.salary,
      department_id: role.department_id,
    };

    return new Promise((resolve, reject) => {
      this.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [role.title, role.salary, role.department_id], (err, results) => {
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
      this.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [employee.first_name, employee.last_name, employee.role_id, employee.manager_id], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(
          `${employee.first_name} ${employee.last_name} added successfully`
        );
      });
    });
  }

  updateEmployeeRole(employee) {
    return new Promise((resolve, reject) => {
      this.query(
        "UPDATE employee SET role_id=$1 WHERE id=$2",
        [employee.role_id, employee.employee_id],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });
  }
}

module.exports = EmployeeDatabase;
