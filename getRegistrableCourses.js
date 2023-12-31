
// function to get the degreeProgress inputting the data_filename and the programmeId

const XLSX = require('xlsx');

// list of courseCodes completed by the student
let studentCourseCodes = [];

// list of programmeCourse objects for a programme
let programmeCourses = [];

// list of courseCodes offered in a semester
let semesterCourses = [];

// list of prequisite objects for a programme
let prerequisites = [];

// list of courseGroup objects
let courseGroups = [];

// list of antirequisite objects for a programme
let antirequisites = [];

// list of all course objects 
let courses = [];

// list of all programmeCreditRequirements objects 
let programmeCreditRequirements = [];

// list of all type objects 
let types = [];





// =======================--FUNCTIONS--=======================


// Function to remove empty and undefined properties
function cleanObject(obj) {
    for (const key in obj) {
        if (obj[key] === '' || obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
}

// returns true if all courses in the group is in the student courses
function groupSatisfied(groupId) {
    // checks for multiple courses in a group
    for (let i = 0; i < courseGroups.length; i++) {
        if (courseGroups[i].groupId === groupId) {

            // if the student does not satisfy the course
            if (!studentCourseCodes.includes(courseGroups[i].courseCode)) {

                // since the student must satisfy all the courses in th group return false
                return false;
            }
        }
    }
    // student satisfies all the courses in the group 
    return true;
}

// returns true if atleast one group of courses is in the student courses
function atLeastOneGroupSatisfied(groupIds) {
    for (const groupId of groupIds) {
        if (groupSatisfied(groupId)) {
            return true;
        }
    }
    return false;
}

// checks if the prerequisites a course in a programme is satisfied  
function arePrerequisitesSatisfied(courseCode, programmeId) {

    let groupIds = [];

    for (j = 0; j < prerequisites.length; j++) {
        // if course has prereq for programme
        if (prerequisites[j].courseCode === courseCode && prerequisites[j].programmeId === programmeId) {
            // get all groups of prerequisites 
            groupIds.push(prerequisites[j].groupId);
        }
    }

    // if there are no groups return true OR if at least one group is satisfied return true
    return groupIds.length === 0 || atLeastOneGroupSatisfied(groupIds);

}

// checks if the student did any anti-requisites for the course
function completedAntirequisites(courseCode) {
    for (let i = 0; i < antirequisites.length; i++) {
        if (antirequisites[i].courseCode === courseCode) {
            for (let j = 0; j < studentCourseCodes.length; j++) {
                if (studentCourseCodes[j] === antirequisites[i].antirequisiteCourseCode) {
                    // console.log("LOG::>" );
                    // console.log(" student course", studentCourseCodes[j]);
                    // console.log(" antirequisite course", antirequisites[i].antirequisiteCourseCode);
                    return true;
                }
            }
        }
    }
    return false;
}


// returns a list of courses the student can register for in the next semester
function get_courses_to_register(programmeId, studentCourseCodes, programmeCourses, semesterCourses, prerequisites, courseGroups) {

    let registerableCourses = [];

    if(degreeProgress.remainingCredits === 0){
        return registerableCourses;
    } 

    // console.log("programmeId", programmeId);
    // console.log("studentCourseCodes: ", studentCourseCodes);
    // console.log("programmeCourses", programmeCourses);
    // console.log("semesterCourses", semesterCourses);
    // console.log("prereq", prerequisites);
    // console.log("courseGroup", courseGroups);
    // console.log("anit-req", antirequisites);

    // for each programme course
    for (i = 0; i < programmeCourses.length; i++) {

        let prereqSatisfied = false;
        let completedAntireq = false;
        // console.log("programmeCourses::> ",programmeCourses[i]);

        // if programmeCourse not completed by the student and is available in the semester
        if (!studentCourseCodes.includes(programmeCourses[i].courseCode) && semesterCourses.includes(programmeCourses[i].courseCode)) {
            
            // check if the student has satisfied the prereqs
            prereqSatisfied = arePrerequisitesSatisfied(programmeCourses[i].courseCode, programmeId);
            // console.log("prereqSatisfied::> ",prereqSatisfied);

            // check if the student has done any anti-requisites
            completedAntireq = completedAntirequisites(programmeCourses[i].courseCode);
            // console.log("completedAntireq::> ",completedAntireq);

            // registerableCourses.push(programmeCourses[i].courseCode);
        }

        // if student satisfies the prereqs and have not done any anti-reqs, course is registerable 
        if (prereqSatisfied === true && completedAntireq === false) {
            registerableCourses.push(programmeCourses[i].courseCode);
            // console.log("push course: ", programmeCourses[i]);
        }

        

    }

    return registerableCourses;
}



function testGetRegistrableCourses(file_path, programmeId){
    // =======================--READ XLSX FILE TO ARRAYS--=======================


    // Load the Excel file
    const workbook = XLSX.readFile(file_path);

    // Iterate over each sheet in the workbook
    workbook.SheetNames.forEach(sheetName => {
        // Get the sheet by its name
        const worksheet = workbook.Sheets[sheetName];
        // console.log("name: ", sheetName);

        // Parse the sheet data
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // console.log("data: ", data);

        // Determine if the sheet has multiple headers
        const headers = data[0];
        let isMultipleHeaders = false;
        if (data[0].length > 1) {
            isMultipleHeaders = true;
        }

        // Store the sheet data accordingly
        if (isMultipleHeaders) {

            const dataArray = [];
            for (let i = 1; i < data.length; i++) {
                const rowData = {};
                for (let j = 0; j < headers.length; j++) {
                    rowData[headers[j]] = data[i][j];
                }
                dataArray.push(rowData);
            }

            switch (sheetName) {

                case "programmeCourses":
                    programmeCourses = dataArray;
                    break;
                case "prerequisites":
                    prerequisites = dataArray;
                    break;
                case "courseGroups":
                    courseGroups = dataArray;
                    break;
                case "antirequisites":
                    antirequisites = dataArray;
                    break;
                case "courses":
                    courses = dataArray;
                    break;
                case "programmeCreditRequirements":
                    programmeCreditRequirements = dataArray;
                    break;
                case "types":
                    types = dataArray;
                    break;
            }


        } else {

            for (let rowNum = 1; rowNum < data.length; rowNum++) {
                for (let valueNum in data[rowNum]) {
                    // console.log("name: ", sheetName);
                    switch (sheetName) {
                        case "studentCourseCodes":
                            studentCourseCodes.push(data[rowNum][valueNum]);
                            break;
                        case "semesterCourses":
                            semesterCourses.push(data[rowNum][valueNum]);
                            break;
                    }
                }
            }
        }

    });

    // Convert the programmeCreditRequirements list to the desired format
    programmeCreditRequirements = programmeCreditRequirements.map(programme => {
        // Extract the programmeId and total properties
        const { programmeId, total } = programme;

        // Create a new object to store the credit requirements
        const creditRequirements = {
            Level1Core: programme.Level1Core,
            Level2Core: programme.Level2Core,
            Level3Core: programme.Level3Core,
            AdvancedCore: programme.AdvancedCore,
            AdvanceElective: programme.AdvanceElective,
            Foundation: programme.Foundation,
            "AdvancedElectiveCS/IT": programme["AdvancedElectiveCS/IT"],
            "AdvancedElectiveCS/IT/E/MATH/M": programme["AdvancedElectiveCS/IT/E/MATH/M"]
        };

        // Clean the object from empty and undefined properties
        cleanObject(creditRequirements);

        // Return the formatted object for the current programme
        return {
            programmeId,
            creditRequirements,
            total
        };
    });





    // =======================--CALL/OUTPUT GETDEGREEPROGRESS--=======================
    

    let registerableCourses = get_courses_to_register(programmeId, studentCourseCodes, programmeCourses, semesterCourses, prerequisites, courseGroups);

    return registerableCourses;

}

module.exports = testGetRegistrableCourses;
