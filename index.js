// Your code here
// populates a record from an Array using the function createEmployeeRecord
function createEmployeeRecord(record){
    return {
        firstName : record[0],
        familyName : record[1],
        title : record[2],
        payPerHour : record[3],
        timeInEvents : [],
        timeOutEvents : [],
        
    }
};

//process an Array of Arrays into an Array of employee records
function createEmployeeRecords(arrayOfArrays) {
    // Initialize an empty array to store the employee records
    const employeeRecords = [];

    // Iterate through the arrayOfArrays and convert each nested array into an employee record
    for (const employeeData of arrayOfArrays) {
    const employeeRecord = createEmployeeRecord(employeeData);
    employeeRecords.push(employeeRecord);
    }

    // Return the array of employee records
    return employeeRecords;
}
// it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record.
function createTimeInEvent(recordEmployee, dateStamp){
    const[date, time] = dateStamp.split(" ");

    // Extract the hour and minute from the time part
    const hour = parseInt(time.substring(), 10);

    recordEmployee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: hour,

    });
    return recordEmployee;
} 

// it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
function createTimeOutEvent(recordEmployee, dateStamp){
    const[date, time] = dateStamp.split(" ");

    // Extract the hour and minute from the time part
    const hour = parseInt(time.substring(), 10);

    recordEmployee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: hour,

    });
    return recordEmployee;
}
//Given an employee record with a date-matched timeInEvent and timeOutEvent.
// Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(employeeRecord, dateX) {
    // Find the timeIn event for the specified date
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === dateX);

    // Find the timeOut event for the specified date
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === dateX);

    // Check if both timeIn and timeOut events exist for the specified date
    if (timeInEvent && timeOutEvent) {
      // Calculate the hours worked by subtracting timeOut from timeIn
    const hoursWorked = Math.floor((timeOutEvent.hour - timeInEvent.hour)/100);
      return Math.abs(hoursWorked); // Taking the absolute value in case of negative hours
    } else {
      // Return 0 or handle the case where either timeIn or timeOut event is missing
      return 0; // Or you can return a different value or handle the error as needed
    }
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
// Using `hoursWorkedOnDate`, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.

function wagesEarnedOnDate(employeeRecord, onDate){
    const hoursWorked = hoursWorkedOnDate(employeeRecord,onDate);
    const payRate = employeeRecord.payPerHour;
    const earnedWages = hoursWorked * payRate;
    return earnedWages;
}


// Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. **HINT**: You will need to find the available dates somehow...

// Creating an array of earnedWages of all dates.
// Resduce the array to payOwed

function allWagesFor(employeeRecord) {
    // Initialize the total pay owed
    let payOwed = 0;

    // Iterate through timeInEvents to calculate wages for each date
    for (const timeInEvent of employeeRecord.timeInEvents) {
      // Find the corresponding timeOut event for the date
        const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === timeInEvent.date);

      // If both timeIn and timeOut events exist for the date, calculate and add the wage
        if (timeOutEvent) {
        const wageForDate = wagesEarnedOnDate(employeeRecord, timeInEvent.date);
        payOwed += wageForDate;
        }
    }

    return payOwed;
}

// calculatePayroll() :  Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.

function calculatePayroll(employeeRecords) {
    // Initialize the total payroll
    let totalPayroll = 0;
  
    // Iterate through each employee record
    for (const employeeRecord of employeeRecords) {
      // Iterate through timeInEvents to calculate wages for each date
        for (const timeInEvent of employeeRecord.timeInEvents) {
        // Find the corresponding timeOut event for the date
            const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === timeInEvent.date);

        // If both timeIn and timeOut events exist for the date, calculate and add the wage
            if (timeOutEvent) {
                const wageForDate = wagesEarnedOnDate(employeeRecord, timeInEvent.date);
                totalPayroll += wageForDate;
            }
        }
    }
    return totalPayroll;
}


