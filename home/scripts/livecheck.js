// Get current date
var date = new Date();

// Is daylight Savings
var daylightSavings = false;

// Nightly start/end times
var startTime = [18, 00]; // FORMAT: [HH, MM]
var endTime   = [21, 00]; // FORMAT: [HH, MM]

var dateStart = "11/25/2022" // FORMAT: MM/DD/YYYY
var dateEnd   = "12/26/2022" // FORMAT: MM/DD/YYYY

// Run checker
showChecker();

// A function that holds all check functions
function showChecker() {
    // Sunday Services
    if(isRunning(date, dateStart, startTime, dateEnd, endTime)){
        document.getElementsByClassName("showNotRunning")[0].style.display = "none";
        document.getElementsByClassName("showRunning")[0].style.display = "block";
    } else {
        document.getElementsByClassName("showRunning")[0].style.display = "none";
        document.getElementsByClassName("showNotRunning")[0].style.display = "block";
    }
}

/** Returns true if show is running, false if not
 * 
 * @param {Date} currentDate 
 * @param {string} dateStart
 * @param {int[]} startTime 
 * @param {string} dateEnd
 * @param {int[]} endTime 
 */
function isRunning(currentDate, dateStart, startTime, dateEnd, endTime) {
    // Should go live
    var showRunning = false;
    var cStartTime, cEndTime, cCurrentTime;

    // Convert strings to dates
    var d1 = dateStart.split("/");
    var d2 = dateEnd.split("/");

    var from = new Date(d1[2], parseInt(d1[0])-1, d1[1]);  // -1 because months are from 0 to 11
    var to   = new Date(d2[2], parseInt(d2[0])-1, d2[1]);

    // Convert current date
    var currentHour = currentDate.getUTCHours() - 4;
    var currentMin = currentDate.getUTCMinutes();

    if (currentHour < 0) { // Shifts day back by one if hours are negative
        currentDate.setDate(currentDate.getDate() - 1);
        currentHour += 24;
    }

    // TODO KNOWN BUG: Day can be 0 if day gets decremented. Must change month to match, but needs to be last day of previous month.
    /*if (currentDateOfMonth < 1) {
        
    }*/

    // Convert timing into minutes
    cStartTime = (startTime[0] * 60) + startTime[1];
    cEndTime = (endTime[0] * 60) + endTime[1];
    cCurrentTime = (currentHour * 60) + currentMin;

    // Apply daylight savings
    if (!daylightSavings) {
        cCurrentTime -= 60;
    }
    
    console.log("Current Date: " + currentDate);
    console.log("Current Time: " + cCurrentTime / 60);
    console.log("Start Time: " + cStartTime / 60);
    console.log("End Time: " + cEndTime / 60);

    // Check if show is running
    
    if(date >= from && date <= to)
        if (cStartTime <= cCurrentTime && cCurrentTime < cEndTime)
            showRunning = true;

    console.log("Show Running? " + (showRunning ? "Yes" : "No"));
    return showRunning;
}