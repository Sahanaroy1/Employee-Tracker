const Database = require("./Database.js");

class EmployeeDatabase extends Database {
  constructor() {
    super();
  }

  getDepartments() {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT * FROM department", (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.rows);
      });
    });
  }

  getRoles() {
    return new Promise((resolve, reject) => {
      this.db.query(
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
      this.db.query(
        `SELECT *
        FROM employee INNER JOIN role ON employee.role_id = role.id`,
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  getEmployeesByRole() {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT employee.id, first_name
        FROM employee`,
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results.rows);
        }
      );
    });
  }

  getManagers() {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT manager_id, first_name FROM employee WHERE manager_id is NOT NULL`,
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results.rows);
        }
      );
    });
  }

  addDepartment(department) {
    return new Promise((resolve, reject) => {
      this.db.query(
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
      title: role.title,
      salary: role.salary,
      department_id: role.department_id,
    };

    return new Promise((resolve, reject) => {
      this.db.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
        [roleData.title, roleData.salary, roleData.department_id], 
        (err, results) => {
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
      this.db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
      [employee.first_name, employee.last_name, employee.role_id, employee.manager_id], (err, results) => {
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
      this.db.query(
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
