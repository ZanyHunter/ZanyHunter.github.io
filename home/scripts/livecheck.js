// Get current date
var date = new Date();

// Is daylight Savings
var daylightSavings = false;

// Sunday Service times
var showStartMonth = 11 // December (months start at 0)
var showStartDate = 11 // Sunday
var showStartTime = [18, 00];

var showEndMonth = 11
var showEndDate = 26
var showEndTime = [21, 30];

// Run checker
liveTrigger();

// A function that holds all check functions
function liveTrigger() {
    // Sunday Services
    if(checkLive(date, showStartMonth, showStartDate, showStartTime, showEndMonth, showEndDate, showEndTime)){
        document.getElementsByClassName("showNotRunning")[0].style.display = "none";
        document.getElementsByClassName("showRunning")[0].style.display = "block";
    } else {
        document.getElementsByClassName("showRunning")[0].style.display = "none";
        document.getElementsByClassName("showNotRunning")[0].style.display = "block";
    }
}

/** Check Live Function
 * 
 * @param {Date} currentDate 
 * @param {int} startMonth
 * @param {int} startDate
 * @param {Array} startTime 
 * @param {int} endMonth
 * @param {int} endDate
 * @param {Array} endTime 
 * @param {int} day Optional
 */
function checkLive(currentDate, startMonth, startDate, startTime, endMonth, endDate, endTime) {
    // Should go live
    var showRunning = false;
    var cStartTime, cEndTime, cCurrentTime;

    // Convert current date
    var currentMonth = currentDate.getUTCMonth();
    var currentDateOfMonth = currentDate.getUTCDate();
    var currentHour = currentDate.getUTCHours() - 4;
    var currentMin = currentDate.getUTCMinutes();

    if (currentHour < 0) { // Shifts day back by one if hours are negative
        currentDateOfMonth--;
        currentHour += 24;
    }

    // TODO KNOWN BUG: Day can be 0 if day gets decremented. Must change month to match, but needs to be last day of
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

    console.log("Current Month: " + currentMonth);
    console.log("Current Date: " + currentDateOfMonth);
    console.log("Current Time: " + cCurrentTime / 60);
    console.log("Start Time: " + cStartTime / 60);
    console.log("End Time: " + cEndTime / 60);

    // Check if show is running
    
    if (startMonth <= currentMonth && currentMonth <= endMonth)
        if(startDate <= currentDateOfMonth && currentDateOfMonth <= endDate)
            if (cStartTime <= cCurrentTime && cCurrentTime <= cEndTime)
                showRunning = true;

    console.log("Show Running? " + showRunning);
    return showRunning;
}