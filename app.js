const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
// const path = require("path");
const fs = require("fs");
// const render = require("./toHTML");
const teamMembers = [];
const idArray = [];
function appMenu() {
  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your manager's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your manager's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "ID must be numerical.";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email address?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Email address is invalid.";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the manager's office number?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Office number must be numerical.";
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerRole, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      idArray.push(answers.managerOfficeNumber);
      buildTeam();
      createTeam();
    });
  }
  function createTeam() {
    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "What role is this team member?",
        choices: [
          "Engineer",
          "Intern",
          "Finalize Team (output results)"
        ]
      }
    ]).then(userChoice => {
      switch (userChoice.memberChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
      }
    });
  }
  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }
          }
          return "ID must be numerical.";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Email address is invalid.";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's GitHub username?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      createTeam();
    });
  }
  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }
          }
          return "ID must be numerical.";
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Email address is invalid.";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "What University does your intern attend?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }
  function buildTeam() {
    let htmlString = '';
    let headHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Manager Team Builder</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style type="text/css">
      .table-wrapper {
        width: 100%
        margin: auto;
            padding: 20px;	
        }
        .table-title {
            padding-bottom: 10px;
            margin: 0 0 10px;
        }
        .table-title h2 {
            margin: 6px 0 0;
            font-size: 22px;
        }
        .table-title .add-new {
            float: right;
        height: 30px;
        font-weight: bold;
        font-size: 12px;
        min-width: 100px;
        border-radius: 50px;
        line-height: 13px;
        }
      .table-title .add-new i {
        margin-right: 4px;
      }
        table.table {
            table-layout: flex;
        }
        table.table th i {
            font-size: 13px;
            margin: 0 5px;
        }
        table.table th:last-child {
            width: 100px;
        }
   
        table.table td i {
            font-size: 19px;
        }
      table.table td a.add i {
            font-size: 24px;
          margin-right: -1px;
            position: relative;
            top: 3px;
        }    
        table.table .form-control {
            height: 32px;
            line-height: 32px;
            border-radius: 2px;
        }
      table.table td .add {
        display: none;
      }
    </style>


    <script type="text/javascript">


     <script type="text/javascript">
    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();
      var actions = $("table td:last-child").html();
      // Append table with add row form on add new button click
        $(".add-new").click(function(){
        $(this).attr("disabled", "disabled");
        var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
        '<td><input type="text" class="form-control" name="name" id="name"></td>' +
        '<td><input type="text" class="form-control" name="role" id="role"></td>' +
        '<td><input type="text" class="form-control" name="ID" id="ID"></td>' +
        '<td><input type="text" class="form-control" name="email" id="email"></td>' +
        '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
  '<td>' + actions + '</td>' +
    '</tr>';
          $("table").append(row);		
        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
            $('[data-toggle="tooltip"]').tooltip();
        });
    </script>
    </head>
    <body> <div class="container">
    <div class="table-wrapper">
        <div class="table-title">
            <div class="row">
                <div class="col-sm-8"><h1>Team Info</h1></div>
                <div class="col-sm-4"></div>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Team Member Name</th>
                    <th>Role</th>
                    <th>Employee ID</th>
                    <th>Work Email</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
      <tr>`;
      
        
        teamMembers.forEach(member => {
            let variable;
            if (member.getRole() === "Manager"){
                variable = `Office Number: ${member.getOfficeNumber()}`
            }
            if (member.getRole()=== "Engineer"){
                variable = `Github UserName: ${member.getGithub()}`
            }
            if (member.getRole()=== "Intern"){
                variable = `University: ${member.getSchool()}`
            }
        
               let teamDiv = 
               `<td>${member.getName()}</td>
                <td>${member.getRole()}</td>
                <td>${member.getId()}</td>
                <td>${member.getEmail()}</td>
                <td> ${variable} </td>
                </tr>`;
                
    headHtml += teamDiv;
  });
  const footerHtml = `
      </body>
      </html>`;

  htmlString = headHtml + footerHtml;
  fs.writeFileSync('team.html', htmlString, "utf-8");
}

createManager();
}
appMenu();