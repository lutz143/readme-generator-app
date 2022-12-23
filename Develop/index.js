console.log('index.js up and running');

// TODO: Include packages needed for this application

const inquirer = require("inquirer");
const {writeFile} = require('fs').promises;

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

function generateToC(tableOfContents){
  if (tableOfContents === 'Yes'){
    return `## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.
    
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)`
  } else {return ''}
}

const generateReadMe = ({projectTitle, projectDescription, tableOfContents, licenses}) =>
`# ${projectTitle}

## Description

${projectDescription}

${generateToC(tableOfContents)}

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