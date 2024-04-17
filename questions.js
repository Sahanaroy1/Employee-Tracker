const MainMenuQuestions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {value: 'view_departments', name: "view all departments"},
            {value: 'view_role', name: "view all roles"},
            {value: 'view_employees', name: "view all employees"},
            {value: 'add_department', name: "add a department"},
            {value: 'add_role', name: "adda role"},
            {value: 'add_employee', name: "add an employee"},
            {value: 'update_role', name: "update an employee role"},
        ],
    },
]

const AddDepartmentQuestions = [
    {
        type: 'input',
        name: 'department_name',
        message: 'Enter the name of the New Department...'
    },
]

const AddRoleQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the Title of the New Role...'
    },
    {
        type: 'number', name: 'salary', message: 'Enter the Salary of the New Role (must be numeric)...',
        validate: function(value) {
            const valid = !isNaN(parseInt(value));
            return valid || "Please enter a number";
        }
    },
    {
        type: 'list',
        name: 'department_id',
        message: 'Select the Department for the Role...',
        choices: [
        ],
    },
]

const AddEmployeeQuestions = [
    {
        type: 'input',
        name: 'first_name',
        message: 'Enter the First Name of the Employee...'
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'Enter the Last Name of the Employee...'
    },
    {
        type: 'list',
        name: 'role_id',
        message: 'Select the Role for the Employee...',
        choices: [
        ],
    },
    {
        type: 'list',
        name: 'manager_id',
        message: 'Select the Employee\'s Manager...',
        choices: [
        ],
    },
]

const UpdateEmployeeRoleQuestions = [
    {
        type: 'list',
        name: 'employee_id',
        message: 'Select the Employee\'s new Role...',
        choices: [
        ],
    },
]

module.exports = { MainMenuQuestions, AddDepartmentQuestions, AddRoleQuestions, AddEmployeeQuestions, UpdateEmployeeRoleQuestions};
