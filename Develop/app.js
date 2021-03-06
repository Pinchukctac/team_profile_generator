const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];


// Write code to use inquirer to gather information about the development team members,



function employeesRole () {
    inquirer.prompt ([{
        type: "list",
        name: "choice",
        choices: ['Manager', 'Engineer', 'Intern', 'Done'],
        message: "Please choose what kind of employee you would like to add"
    }])
        .then(function (answers) {

            if (answers.choice === "Manager") {
                managerInformation();
            } 
            if (answers.choice === "Engineer") {
                engineerInformation();
            }
            if (answers.choice === "Intern") {
                internInformation();
            }
            if (answers.choice === "Done") {
                createHTMLFile();
            }
        })
};

function managerInformation (){

    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "Name"
        },
        {
            type: "input",
            message: "What is your ID?",
            name: "ID"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "Email"
        },
        {
            type: "input",
            message: "What Office Number do you have?",
            name: "Office"
        },
    ]).then (function (managersResponse){
        const manager = new Manager (managersResponse.Name, managersResponse.ID, managersResponse.Email, managersResponse.Office)
        employees.push(manager);

        employeesRole();
    })
};

function engineerInformation (){

    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "Name"
        },
        {
            type: "input",
            message: "What is your ID?",
            name: "ID"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "Email"
        },
        {
            type: "input",
            message: "What is your Github Account",
            name: "github"
        },
    ]).then (function (engineerResponse){
        const engineer = new Engineer (engineerResponse.Name, engineerResponse.ID, engineerResponse.Email, engineerResponse.github)
        employees.push(engineer);

        employeesRole();
    })
};

function internInformation (){

    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "Name"
        },
        {
            type: "input",
            message: "What is your ID?",
            name: "ID"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "Email"
        },
        {
            type: "input",
            message: "What School did you go to?",
            name: "school"
        },
    ]).then (function (internResponse){
        const   intern = new Intern (internResponse.Name, internResponse.ID, internResponse.Email, internResponse.school)
        employees.push(intern);

        employeesRole();
    })
};


employeesRole();


function createHTMLFile () {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(employees), "utf-8");
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
