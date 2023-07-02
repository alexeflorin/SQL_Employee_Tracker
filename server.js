const inquirer = require("inquirer");
const mysql = require ('mysql2');
require('console.table');



// Connect to database
const connection = mysql.createConnection(
	{
	  host: '127.0.0.1',
	  // MySQL username,
	  user: 'root',
	  // MySQL password
	  password: 'password',
	  database: 'employee_db'
	},
	console.log(`Connected to the employee_db database.`)
  );

 
	firstPrompt();



// Function to start the app and use inquirer for questions 
function firstPrompt() {
	inquirer.prompt([
		{
			type: "list",
			name: "userChoice",
			message: "What would you like to do?",
			choices: [
				"View All Empoyees",
				"Add Employee",
				"View All Roles",
				"Add Roles",
				"View All Departments",
				"Add Department",
				"Quit"
			]
		}
	])
	.then ( (res) => {
		console.log (res.userChoice);
		switch(res.userChoice){
			//  Pressent the options
			case "View All Departments":
	        	viewAllDepartments();
				break;
			
			case "View All Roles":
				viewAllRoles();
				break;

			case "View All Employee":
				viewAllEnployee();
				break;

			case "Add Department":
				addDepartment ();
				break;

			case "Add Role":
				addRole();
				break;
				
			case "Add Employee":
				addEmployee();
				break;
				
			case "Update an Employee Role":
				updateEmployeeRole();
				break;

			default:
				process.exit();

		}


	}).catch ((err) => {
		if (err)throw err;
	});
}


// Query database

//  Departaments
function viewAllDepartments() {
	const query = "SELECT * FROM department";
	connection.query(query, (err,res) => {
		if (err) throw err;
		console.table(res);

		firstPrompt();
	});
}


//  Roles
function viewAllRoles() {
	const query = "SELECT * FROM role";
	connection.query(query, (err,res) => {
		if (err) throw err;
		console.table(res);

		firstPrompt();
	});
}

//  Employyes
function viewAllEmployees() {
	const query =    `SELECT 
	employee.id, 
	employee.first_name, 
	employee.last_name, 
	role.title, 
	department.name AS department, 
	role.salary, 
	CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role
	ON employee.role_id = role.id
LEFT JOIN department
	ON department.id = role.department_id
LEFT JOIN employee manager
	ON manager.id = employee.manager_id`

	connection.query(query, (err,res) => {
		if (err) throw err;
		console.table(res);

		firstPrompt();
	});
}

// Add Department
function addDepartment () {
	inquirer
        .prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Departments: ',
                choices: [
					"Engineering",
					"Human Resources",
					"Customer Service",
					"Marketing",
					"Maintenance",
					"Finance"
				]
            }
        ]).then((res)=>{ 
        let query = `SELECT 
                        employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        role.title, 
                        department.name
                    FROM employee
                    JOIN role
                        ON employee.role_id = role.id
                    JOIN department
                        ON department.id = role.department_id
                    WHERE department.id = ?`
  
        connection.query(query, res.department,(err, res)=>{
        if(err)throw err;
		firstPrompt();
          console.table(res);
        });
	})
}


//  Add employee
 function addEmployee() {
	inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Add Employee',
                choices: [
					"John Doe",
					"Mike Chan",
					"Ashley Rodriguez",
					"Kevin Tupik",
					"Melisa Brown",
					"Sara Lourd"
				]
			}
		]).then((res)=> {
			firstPrompt();
			console.table(res);
			});
		
	};
