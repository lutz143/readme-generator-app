console.log('index.js up and running');

// TODO: Include packages needed for this application

const inquirer = require("inquirer");
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
  {
  name: 'projectTitle',
  message: 'Enter your project title:',
  type: 'input',
  },
  {
  name: 'projectDescription',
  message: 'Provide a description of your project:',
  type: 'editor',
  },
  {
  name: 'tableOfContents',
  message: 'Does your project require a Table of Contents:',
  type: 'list',
  choices: ['Yes', 'No'],
  },
  {
  name: 'licenses',
  message: 'What Licenses are Required:',
  type: 'checkbox',
  choices: ['MIT','License2','NEEDMORE'],
  },
];

inquirer.prompt(questions)
.then((data) => {
  const filename = `${data.projectTitle.toLowerCase().split(' ').join('')}.json`;

  fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
    err ? console.log(err) : console.log('Success!')
  );
});

// function promptUser() {
//   for (const question of questions){
//     inquirer.prompt(question)
//     .then((data) => {
//       const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;
  
//       fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
//         err ? console.log(err) : console.log('Success!')
//       );
//     });
//   }
// }

// promptUser();

// // TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// // TODO: Create a function to initialize app
// function init() {}

// // Function call to initialize app
// init();
