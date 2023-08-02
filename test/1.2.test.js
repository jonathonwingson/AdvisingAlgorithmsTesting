
// Degree Progress Test for TestCase - 1.2
// Student completed no programme courses
// Some programme courses are offered in the semester

// run using "npm run test_case_-1.2"
// 

const chai = require('chai');
const expect = chai.expect;
const testGetDegreeProgress = require('../getDegreeProgress.js'); // Replace './getdegreeprogress.js' with the correct path to the file
const testGetRegistrableCourses = require('../getRegistrableCourses.js');


describe('Degree Progress Test and Eligible Courses for TestCase:\n  1.2 - Student completed none of the required courses and some courses are offered', function () {

  const programmeId = 1;
  const file_path = '/workspaces/AdvisingAlgorithmsTesting/TestCase - 1.2.xlsx';

  // Call the testGetDegreeProgress function and capture its output
  const degreeProgress = testGetDegreeProgress(file_path, programmeId);

  const eligibleCourses = testGetRegistrableCourses(file_path, programmeId);

  it('Should calculate completed courses correctly', function () {

    // Perform your assertions using Chai's expect
    expect(degreeProgress).to.be.an('object');

    // Assert the completedCourses array
    const expectedCompletedCourses = [];
    expect(degreeProgress.completedCourses).to.deep.equal(expectedCompletedCourses);

  });

  it('Should calculate the total completed credits correctly', function(){
     // Assert the totalCompletedCredits
     const expectedTotalCompletedCredits = 0;
     expect(degreeProgress.totalCompletedCredits).to.equal(expectedTotalCompletedCredits); 
  });

  it('Should calculate the remaining requirements correctly', function(){
     
    // Assert the remainingRequirements array of objects
     const expectedRemainingRequirements = [
      { type: 'Level1Core', remainingCredits: 24 },
      { type: 'Level2Core', remainingCredits: 30 },
      { type: 'Level3Core', remainingCredits: 15 },
      { type: 'AdvanceElective', remainingCredits: 15 },
      { type: 'Foundation', remainingCredits: 9 }
    ];
    expect(degreeProgress.remainingRequirements).to.deep.equal(expectedRemainingRequirements);

  });

  it('Should calculate the total remaining credits correctly', function(){
    
    // Assert the remainingCredits
    const expectedRemainingCredits = 93;
    expect(degreeProgress.remainingCredits).to.equal(expectedRemainingCredits);

  });

  it('Should calculate the correct courses a student can register for', function(){
    
    const expectedEligibleCourses = [
      'COMP1600',
      'COMP2601',
      'COMP3601',
      'FOUN1101',
      'INFO1600',
      'MATH1115'
    ];
    expect(eligibleCourses).to.deep.equal(expectedEligibleCourses);
  
  });

});




