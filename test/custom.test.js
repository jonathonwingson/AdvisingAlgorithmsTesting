
// Degree Progress Test for TestCase - 1.0
// Student completed all programme courses

// run using "npm run test -- --file_path "custom.xlsx" --programmeId 1"
// if no file_path or programmeId is entered it defaults to tesctCase 1.0

const chai = require('chai');
const expect = chai.expect;
const testGetDegreeProgress = require('../getDegreeProgress.js');
const testGetRegistrableCourses = require('../getRegistrableCourses.js');


// Function to extract command-line argument value by its name
function getCommandLineArgValue(argName, defaultValue) {
    const index = process.argv.indexOf(argName);
    return index !== -1 && process.argv.length > index + 1 ? process.argv[index + 1] : defaultValue;
}

describe('Returns the Degree Progress and Eligible Courses', function () {

    // Get the `programmeId` value from command-line arguments
    const programmeId = parseInt(getCommandLineArgValue('--programmeId', '1'));
    // console.log("PROGRAMMEID:::::", programmeId);

    // Get the `programmeId` value from command-line arguments
    const file_path = "/workspaces/AdvisingAlgorithmsTesting/" + getCommandLineArgValue('--file_path', 'TestCase - 1.0.xlsx');
    // console.log("FILEPATH:::::", file_path);
    
    // Call the testGetDegreeProgress function and capture its output
    const degreeProgress = testGetDegreeProgress(file_path, programmeId);

    const eligibleCourses = testGetRegistrableCourses(file_path, programmeId);

    it('Degree Progress should output an object', function () {

        // Perform your assertions using Chai's expect
        expect(degreeProgress).to.be.an('object');
        console.log("Degree Progress: ", degreeProgress);

    });

    it('Eligible Course should output and array', function(){

        expect(eligibleCourses).to.be.an('array');
        console.log("Eligible Courses: ", eligibleCourses);

    })
    

});




