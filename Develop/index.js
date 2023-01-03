// request the inquirer package to display questions to the user
const inquirer = require("inquirer");
const {writeFile} = require('fs').promises;



// array of questions with detailed instructions to the user in order to prompt for inputs
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
  choices: ['MIT','ISC','IPA','JAM'],
  },
  {
  name: 'tableOfContents',
  message: 'Does your project require a Table of Contents:',
  type: 'list',
  choices: ['Yes', 'No'],
  },
  {
  name: 'gitHub',
  message: 'Input your GitHub username:',
  type: 'input',  
  },
  {
  name: 'email',
  message: 'Input your email:',
  type: 'input',  
  },
];

// function to create Table of Contents if user selects yes
function generateToC(tableOfContents){
  if (tableOfContents === 'Yes'){
    return `## Table of Contents

If your README is long, add a table of contents to make it easy for users to find what they need.
    
- [Installation](#installation)
- [Usage](#usage)
- [How to Contribute](#how-to-contribute)
- [License](#license)`
  } else {return ''}
}

// function to generate license badges and links to the license selected by the user
function generateLicense(licenses) {
  if (licenses.length>1) {
    let badges = []
    for (const license of licenses) {
      let printLicenseBadge = `[![License: ${license}](https://img.shields.io/badge/License-${license}-blue.svg)](https://opensource.org/licenses/${license})\n`;
      badges.push(printLicenseBadge);
    }
    return badges;
  } else {
    let badge = `[![License: ${licenses}](https://img.shields.io/badge/License-${licenses}-blue.svg)](https://opensource.org/licenses/${licenses})`;
    return badge;
  }
}

// function to generate the quality README file by using template literals and inputting the user selections
const generateReadMe = ({projectTitle, projectDescription, installation, usage, contributions, testInformation, tableOfContents, gitHub, email, licenses}) =>
`# ${projectTitle}

${generateLicense(licenses)}

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

## Questions
* For questions, you may contact me on GitHub: [${gitHub}](https://github.com/${gitHub})
* For immediate concerns, email me at: ${email}

---

## License
${licenses}`;

// function to prompt the user of the array of questions to generate the quality README
const promptUser = () => {
  return inquirer.prompt(questions);
}

// init function to be called upon application kick off, utilizing promises upon receiving answer from the promptUser function
const init = () => {
  promptUser()
    .then((answers) => writeFile('README.md', generateReadMe(answers)))
    .then(() => console.log('Quality README has been generated to folder.'))
    .catch((err) => console.error(err));
}

init();