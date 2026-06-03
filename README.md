# Automation Tests on Azure DevOps(JTests/NodeJs)
Sample Application to be tested using JTest on Azure DevOps Build Pipelines is a Simple Calculator App with Functions containing all the operations of

## Pre-Requisites
We'll be taking example of a very basic Calculator Application written in NodeJs and Automation Test for the same in Jest

## Folder Structure
```text
calculator-app/
│
├── src/
│   └── calculator.js
│
├── tests/
│   └── calculator.test.js
│
├── package.json
└── azure-pipelines.yml
```

### package.json

```
{
  "name": "calculator-app",
  "version": "1.0.0",
  "description": "Sample Node.js app for Azure Pipelines",
  "main": "src/calculator.js",
  "scripts": {
    "test": "jest --ci --reporters=default --reporters=jest-junit",
    "test:coverage": "jest --coverage"
  },
  "devDependencies": {
    "jest": "^30.0.0",
    "jest-junit": "^17.0.0"
  }
}
```

we have two scripts mentioned 

1. test - To run all the test cases written in the caculator.test.js file
2. test:coverage - To check how many functions in calculator.js are being covered under the test cases written in calculator.test.js

In Dev dependencies

1. jest - Allow us to run Javascript testcases and Code coverage
2. jest-junit - Coverets jest report into junit which can be read and published by Azure DevOps Build Pipelines

### src/calculator.js

```
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }

    return a / b;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide
};
```

### src/calculator.js

```
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }

    return a / b;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide
};
```

### src/calculator.test.js

```
const calculator = require('../src/calculator');

describe('Calculator Tests', () => {

    test('should add numbers', () => {
        expect(calculator.add(2, 3)).toBe(5);
    });

    test('should subtract numbers', () => {
        expect(calculator.subtract(5, 2)).toBe(3);
    });

    test('should multiply numbers', () => {
        expect(calculator.multiply(3, 4)).toBe(12);
    });

    test('should divide numbers', () => {
        expect(calculator.divide(10, 2)).toBe(5);
    });

    test('should throw error when dividing by zero', () => {
        expect(() => {
            calculator.divide(10, 0);
        }).toThrow("Division by zero");
    });

});
```


### Azure Devops Build Pipeline
### azure-pipelines.yml
```
trigger:
- master

pool:
 vmImage: ubuntu-latest

- stage: Test
  jobs:
  - job: TestProject
    steps:
    - task: NodeTool@0
      inputs:
        versionSpec: '22.x'

    - script: npm install
      displayName: Install Dependencies

    - script: npm test
      displayName: Run Test 

    - script: npm run test:coverage
      displayName: Run Code Coverage 

    - task: PublishTestResults@2
      inputs:
        testResultsFormat: JUnit
        testResultsFiles: junit.xml
        failTaskOnFailedTests: true

    - task: PublishCodeCoverageResults@2
      inputs:
        codeCoverageTool: Cobertura
        summaryFileLocation: 'coverage/cobertura-coverage.xml'

```

For Test Cases and its Reporting

You can simply deploy this onto Azure DevOps Build Pipeline and one the build succeeds, You will be able to see the Passed/Failed Test Cases, Also with the help of Jest-Junit Reporting we can see a detailed report in the same run as well.

![My Screenshot](./im.jpg)

For Test Coverage
