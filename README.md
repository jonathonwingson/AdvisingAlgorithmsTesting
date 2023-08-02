# AdvisingAlgorithmsTesting


Test Cases Document:
    https://docs.google.com/document/d/1zxvkOXpjPCgnS-uKkCK7Ha14m_CSF83UdPuB0DPgwaw/edit?usp=sharing


Pre-defined test cases test against expected data and returns whether the test passed or not.
To run use predefined cases:
    1. npm run test-case-1.0 (Compledted All Courses)
    2. npm run test-case-1.1 (Completed No Courses, All Courses Offered)
    3. npm run test-case-1.2 (Completed No Courses, Some Courses Offered)
    4. npm run test-case-1.3 (Completed Some Coursess, All Courses Offered)
    5. npm run test-case-1.4 (Comleted Some Course, None Offered)
    6. npm run test-case-1.5 (Completed Some Courses, Some Offered)

Custom test cases log the Degree Progress and the Eligible Courses to the console to be manually checked for correctness.
To run custom Xlsx files use:
    npm run test -- --file_path "file_path" --programmeId "programmeId"


NOTE: If no file_path or programmeId is given the default is:
    file_path: TestCase - 1.0.xlsx,
    programmeId: 1

