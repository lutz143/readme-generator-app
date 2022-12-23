console.log('index.js up and running');

// TODO: Include packages needed for this application

const inquirer = require("inquirer");
const {writeFile} = require('fs').promises;

// Project Title, Description, Table of Contents, Installation, Usage, Contributing, Tests, Questions, License

// TODO: Create an array of questions for user input
questions = [
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
  name: 'installation',
  message: 'What are the steps required to install your project?',
  type: 'editor',
  },
  {
  name: 'licenses',
  message: 'What Licenses are Required:',
  type: 'checkbox',
  choices: ['MIT','License2','NEEDMORE'],
  },
  {
  name: 'tableOfContents',
  message: 'Does your project require a Table of Contents:',
  type: 'list',
  choices: ['Yes', 'No'],
  },
];

function generateToC(tableOfContents){
  if (tableOfContents === 'Yes'){
    return `## Table of Contents

If your README is long, add a table of contents to make it easy for users to find what they need.
    
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)`
  } else {return ''}
}

const generateReadMe = ({projectTitle, projectDescription, installation, tableOfContents, licenses}) =>
`# ${projectTitle}

## Description
${projectDescription}

${generateToC(tableOfContents)}

## Installation
${installation}

---

## License
${licenses}`;

const promptUser = () => {
  return inquirer.prompt(questions);
}


const init = () => {
  promptUser()
    .then((answers) => writeFile('README.md', generateReadMe(answers)))
    .then(() => console.log('Quality README has been generated to folder.'))
    .catch((err) => console.error(err));
}

init();