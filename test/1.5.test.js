
// Degree Progress Test for TestCase - 1.1
// Student completed no programme courses
// all the programme courses are offered in the semester

// run using "npm run progress-test-1.0"
// 

const chai = require('chai');
const expect = chai.expect;
const testGetDegreeProgress = require('../getDegreeProgress.js'); // Replace './getdegreeprogress.js' with the correct path to the file
const testGetRegistrableCourses = require('../getRegistrableCourses.js');


describe('Degree Progress Test and Eligible Courses for TestCase:\n  1.5 - Student completed some of the required courses and some of the courses are offered.', function () {

    const programmeId = 1;
    const file_path = '/workspaces/AdvisingAlgorithmsTesting/TestCase - 1.5.xlsx';

    // Call the testGetDegreeProgress function and capture its output
    const degreeProgress = testGetDegreeProgress(file_path, programmeId);
    const eligibleCourses = testGetRegistrableCourses(file_path, programmeId);

    it('Should calculate completed courses correctly', function () {

        // Perform your assertions using Chai's expect
        expect(degreeProgress).to.be.an('object');

        // Assert the completedCourses array
        const expectedCompletedCourses = ['COMP1600', 'COMP1601', 'INFO1600', 'MATH1115', 'FOUN1101'];
        expect(degreeProgress.completedCourses).to.deep.equal(expectedCompletedCourses);

    });

    it('Should calculate the total completed credits correctly', function () {
        // Assert the totalCompletedCredits
        const expectedTotalCompletedCredits = 15;
        expect(degreeProgress.totalCompletedCredits).to.equal(expectedTotalCompletedCredits);
    });

    it('Should calculate the remaining requirements correctly', function () {

        // Assert the remainingRequirements array of objects
        expectedRemainingRequirements = [
            { type: 'Level1Core', remainingCredits: 12 },
            { type: 'Level2Core', remainingCredits: 30 },
            { type: 'Level3Core', remainingCredits: 15 },
            { type: 'AdvanceElective', remainingCredits: 15 },
            { type: 'Foundation', remainingCredits: 6 }
        ];
        expect(degreeProgress.remainingRequirements).to.deep.equal(expectedRemainingRequirements);

    });

    it('Should calculate the total remaining credits correctly', function () {

        // Assert the remainingCredits
        const expectedRemainingCredits = 78;
        expect(degreeProgress.remainingCredits).to.equal(expectedRemainingCredits);

    });

    it('Should calculate the correct courses a student can register for', function () {

        const expectedEligibleCourses = [
            'COMP2601', 'COMP2602',
            'COMP3601', 'FOUN1105',
            'INFO1601', 'INFO2602',
            'INFO2604', 'INFO3600',
            'INFO3604', 'MATH2250'
          ];
        expect(eligibleCourses).to.deep.equal(expectedEligibleCourses);

    });
});




