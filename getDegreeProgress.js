
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

// returns the students degree progress(list of completed courses, total credits completed, remaining requirements and total credits remaining)
function getDegreeProgress(programmeId, studentCourseCodes, programmeCourses, courses, programmeCreditRequirements) {

    let totalCredits = 0;
    let completedCourses = [];

    let programmeCreditRequirement = programmeCreditRequirements.find((pcr) => pcr.programmeId === programmeId);
    let creditRequirements = programmeCreditRequirement.creditRequirements;
    for (let creditType in creditRequirements) {

        let typeObj = types.find((type) => type.type === creditType);
        let typeId = typeObj ? typeObj.typeId : null;

        for (let i = 0; i < studentCourseCodes.length; i++) {
            let course = courses.find((c) => c.courseCode === studentCourseCodes[i]);
            let programmeCourse = programmeCourses.find((c) => c.courseCode === studentCourseCodes[i] && c.typeId === typeId);
            if (creditRequirements[creditType] <= 0) {
                break;
            }
            if (programmeCourse && !completedCourses.includes(programmeCourse.courseCode)) {
                let credits = parseInt(course.credits);
                completedCourses.push(course.courseCode);
                creditRequirements[creditType] -= credits;
                totalCredits = totalCredits + credits;
            }
        }

    }

    let remainingRequirements = [];
    for (let type in creditRequirements) {
        remainingRequirements.push({ type, remainingCredits: creditRequirements[type] });
    }

    let degreeProgress = {
        remainingRequirements: remainingRequirements,
        completedCourses: completedCourses,
        totalCompletedCredits: totalCredits,
        remainingCredits: programmeCreditRequirement.total - totalCredits
    };

    return degreeProgress;
}

function testGetDegreeProgress(file_path, programmeId) {


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
    

    degreeProgress = getDegreeProgress(programmeId, studentCourseCodes, programmeCourses, courses, programmeCreditRequirements);
    
    // console.log("LOG::> Degree Progress: ");
    // console.log("Completed Courses: ", degreeProgress.completedCourses);
    // console.log("Total Completed Credits: ", degreeProgress.totalCompletedCredits);
    // console.log("\n");
    // console.log("Remaining Requirements: ", degreeProgress.remainingRequirements);
    // console.log("Total Remaining Credits: ", degreeProgress.remainingCredits);
    // console.log("\n");

    return degreeProgress;

}


module.exports = testGetDegreeProgress;

