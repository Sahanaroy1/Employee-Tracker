const { prompt } = require("inquirer");
const {
  MainMenuQuestions,
  AddDepartmentQuestions,
  AddRoleQuestions,
  AddEmployeeQuestions,
  UpdateEmployeeRoleQuestions,
} = require("./questions.js");
const EmployeeDatabase = require("./db/EmployeeDatabase.js");

const db = new EmployeeDatabase({
  host: "localhost",
  user: "postgres",
  password: "Siyona12!",
  database: "employees_db",
});

db.connect();

const doMenuQuestions = () => {
  prompt(MainMenuQuestions).then((response) => {
    switch (response.option) {
      case "view_departments":
        view_departments();
        break;
      case "view_roles":
        view_roles();
        break;
      case "view_employees":
        view_employees();
        break;
      case "add_role":
        add_role();
        break;
      case "update_role":
        update_role();
        break;
    }
  });
};

const view_departments = () => {
  db.getDepartments().then((results) => {
    console.table(results);
    doMenuQuestions();
  });
};

const view_roles = () => {
  db.getRoles().then((results) => {
    console.table(results);
    doMenuQuestions();
  });
};

const view_employees = () => {
  db.getEmployee().then((results) => {
    console.table(results);
    doMenuQuestions();
  });
};

const add_department = () => {
  inquirer.createPromptModule(AddDepartmentQuestions).then((response) => {
    db.addDepartment(response).then((results) => {
      console.log("\n", results, "\n");
      doMenuQuestions();
    });
  });
};

const add_role = () => {
  db.getDepartments().then((results) => {
    const departmentQuestion = AddRoleQuestions[2];
    results.forEach((department) => {
      departmentQuestion.choices.push({
        value: department.id,
        name: department.name,
      });
    });

    inquirer.prompt(AddRoleQuestions).then((response) => {
      db.addRole(response).then((results) => {
        console.log("\n", results, "\n");
        doMenuQuestions();
      });
    });
  });
};

const add_employee = () => {
  db.getRoles().then((results) => {
    const roleQuestions = AddEmployeeQuestions[2];
    results.forEach((role) => {
      const role_summary = `${role.title} (${role.department_name}: ${role.salary})`;
      roleQuestions.choices.push({
        value: role.id,
        name: role_summary,
      });
    });
    db.getEmployee().then((results) => {
      const managerQuestion = AddEmployeeQuestions[3];
      results.forEach((employee) => {
        managerQuestion.choices.push({
          value: employee.id,
          name: employee.name,
        });
      });

      managerQuestion.choices.push({
        value: null,
        name: "None",
      });

      inquirer.prompt(AddDepartmentQuestions).then((response) => {
        db.addEmployee(response).then((results) => {
          console.log("\n", results, "\n");
          doMenuQuestions();
        });
      });
    });
  });
};

const update_role = () => {
  db.getEmployees().then((results) => {
    const employeeQuestion = UdateEmployeeRoleQuestions[0];
    results.forEach((employee) => {
      employeeQuestion.choices.push({
        value: employee.id,
        name: employee.name,
      });
    });
    db.getRoles().then((results) => {
      const releQuestion = UpdateEmployeeRoleQuestions[1];
      results.forEach((role) => {
        roleQuestion.choices.push({
          value: role.id,
          name: role.title,
        });
      });

      inquirer.prompt(UpdateEmployeeRoleQuestions).then((response) => {
        db.updateEmployeeRole(response).then((results) => {
          console.log("\n", results, "\n");
          doMenuQuestions();
        });
      });
    });
  });
};

doMenuQuestions();
