const inquirer = require('inquirer');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'project-title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'project-description',
      message: 'What is a short description of your project?',
    },
  ]);
};

promptUser();