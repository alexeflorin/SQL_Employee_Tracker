
USE employee_db;

INSERT INTO department ( name )
VALUES 
("Engineering"),
("Human Resources"),
("Customer Service"),
("Marketing"),
("Maintenance"),
("Finance");

INSERT INTO role ( title, salary, department_id )
VALUES
("Senior Engineer", 100000, 1),
("Junior Engineer", 75000, 2),
("HR Director", 125000, 1),
("HR Consultant", 100000, 2),
("Customer Service Representativ", 75000, 1),
("Customer Service Manager", 100000, 2),
("Marketing Director", 125000, 1),
("Maintenance Director", 95000, 1),
("Finance Manager", 125000, 1);

INSERT INTO employee ( first_name, last_name, role_id, manager_id )
VALUES
("John", "Doe", 1, 1),
("Mike", "Chan", 2, 2),
("Ashley", "Rodriguez", 3, 3),
("Kevin", "Tupik", 4, 4),
("Melisa", "Brown", 5, 5),
("Sara", "Lourd", 6, 6);




