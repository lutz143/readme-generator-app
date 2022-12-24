console.log('index.js up and running');

// TODO: Include packages needed for this application

const inquirer = require("inquirer");
const {writeFile} = require('fs').promises;

// Table of Contents, Contributing, Tests, Questions, License

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
  name: 'usage',
  message: 'How should your application be used?\nProvide instructions and examples for use. Include screenshots as needed.',
  type: 'editor',
  },
  {
  name: 'contributions',
  message: 'If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so.\nThe [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you\'d prefer.',
  type: 'editor',
  },
  {
  name: 'testInformation',
  message: 'Provide information about recent undergone tests and how to test the project for bugs.',
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

const generateReadMe = ({projectTitle, projectDescription, installation, usage, contributions, testInformation, tableOfContents, licenses}) =>
`# ${projectTitle}

## Description
${projectDescription}

${generateToC(tableOfContents)}

## Installation
${installation}

## Usage
${usage}

---

## How to Contribute
${contributions}

## Tests
${testInformation}

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