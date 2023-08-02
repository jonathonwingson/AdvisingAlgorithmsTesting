
// Degree Progress Test for TestCase - 1.0
// Student completed all programme courses

// run using "npm run test-case-1.0"
// 

const chai = require('chai');
const expect = chai.expect;
const testGetDegreeProgress = require('../getDegreeProgress.js');
const testGetRegistrableCourses = require('../getRegistrableCourses.js');


describe('Degree Progress Test for TestCase - 1.0.\n  Student completed all required courses.', function () {

  const programmeId = 1;
  const file_path = '/workspaces/AdvisingAlgorithmsTesting/TestCase - 1.0.xlsx';

  // Call the testGetDegreeProgress function and capture its output
  const degreeProgress = testGetDegreeProgress(file_path, programmeId);

  const eligibleCourses = testGetRegistrableCourses(file_path, programmeId);

  it('Should calculate completed courses correctly', function () {

    // Perform your assertions using Chai's expect
    expect(degreeProgress).to.be.an('object');

    // Assert the completedCourses array
    const expectedCompletedCourses = [
      'COMP1600', 'COMP1601', 'COMP1602',
      'COMP1603', 'COMP1604', 'INFO1600',
      'INFO1601', 'MATH1115', 'COMP2601',
      'COMP2602', 'COMP2603', 'COMP2604',
      'COMP2605', 'COMP2606', 'COMP2611',
      'INFO2602', 'INFO2604', 'MATH2250',
      'COMP3601', 'COMP3602', 'COMP3603',
      'COMP3613', 'INFO3604', 'COMP3609',
      'INFO3608', 'INFO3610', 'INFO3611',
      'FOUN1101', 'FOUN1105', 'FOUN1301'
    ];
    expect(degreeProgress.completedCourses).to.deep.equal(expectedCompletedCourses);

  });

  it('Should calculate the total completed credits correctly', function(){
     // Assert the totalCompletedCredits
     const expectedTotalCompletedCredits = 93;
     expect(degreeProgress.totalCompletedCredits).to.equal(expectedTotalCompletedCredits); 
  });

  it('Should calculate the remaining requirements correctly', function(){
     
    // Assert the remainingRequirements array of objects
     const expectedRemainingRequirements = [
      { type: 'Level1Core', remainingCredits: 0 },
      { type: 'Level2Core', remainingCredits: 0 },
      { type: 'Level3Core', remainingCredits: 0 },
      { type: 'AdvanceElective', remainingCredits: 0 },
      { type: 'Foundation', remainingCredits: 0 }
    ];
    expect(degreeProgress.remainingRequirements).to.deep.equal(expectedRemainingRequirements);

  });

  it('Should calculate the total remaining credits correctly', function(){
    
    // Assert the remainingCredits
    const expectedRemainingCredits = 0;
    expect(degreeProgress.remainingCredits).to.equal(expectedRemainingCredits);

  });

  it('Should calculate the correct courses a student can register for', function(){
    const expectedEligibleCourses = [

    ];
  });

});




