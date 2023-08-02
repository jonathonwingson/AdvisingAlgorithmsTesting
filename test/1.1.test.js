
// Degree Progress Test for TestCase - 1.1
// Student completed no programme courses
// all the programme courses are offered in the semester

// run using "npm run progress-test-1.0"
// 

const chai = require('chai');
const expect = chai.expect;
const testGetDegreeProgress = require('../getDegreeProgress.js'); // Replace './getdegreeprogress.js' with the correct path to the file


describe('Degree Progress Test for TestCase - 1.0', function () {

  const programmeId = 1;
  const file_path = '/workspaces/AdvisingAlgorithmsTesting/TestCase - 1.1.xlsx';

  // Call the testGetDegreeProgress function and capture its output
  const degreeProgress = testGetDegreeProgress(file_path, programmeId);

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

});




