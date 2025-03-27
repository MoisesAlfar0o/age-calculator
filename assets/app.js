const d = document; 

const dayInput = d.getElementById('input-day');
const monthInput = d.getElementById('input-month');
const yearInput = d.getElementById('input-year');
const form = d.getElementById('age-form');

const errorDay = d.getElementById('error-day');
const errorMonth = d.getElementById('error-month');
const errorYear = d.getElementById('error-year');

const yearSpan = d.getElementById('years');
const monthSpan = d.getElementById('months');
const daySpan = d.getElementById('days');

// Reset the results when called
function resetResults() {
    yearSpan.textContent = '--';
    monthSpan.textContent = '--';
    daySpan.textContent = '--';
}

// Validate the day input (should be between 1 and 31)
function validateDay(day) {
    if (day < 1 || day > 31) {
        errorDay.textContent = 'Must be a valid day'; // Show error message
        return false;
    }
    errorDay.textContent = ''; // Clear error message if valid
    return true;
}

// Validate the month input (should be between 1 and 12)
function validateMonth(month) {
    if (month < 1 || month > 12) {
        errorMonth.textContent = 'Must be a valid month'; // Show error message
        return false;
    }
    errorMonth.textContent = ''; // Clear error message if valid
    return true;
}

// Validate the year input (should be greater than or equal to 1900 and in the past)
function validateYear(year) {
    const currentYear = new Date().getFullYear(); // Get the current year
    if (year < 1900) {
        errorYear.textContent = 'Must be >= 1900'; // Show error message
        return false;
    }
    if (year => currentYear) {
        errorYear.textContent = 'Must be in the past'; // Show error message if future year
        return false;
    }
    errorYear.textContent = ''; // Clear error message if valid
    return true;
}


function getDate(dayValue, monthValue, yearValue){
    // Convert the input values to numbers
    const day = Number(dayValue);
    const month = Number(monthValue);
    const year = Number(yearValue);

    // Validate if the input date exists in the given month (e.g., 29th February on a non-leap year)
    const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month
    if (day > daysInMonth) {
        errorDay.textContent = 'Must be a valid date'; // Show error if the date is invalid
        resetResults(); // Reset the results
        return;
    }

    // Calculate age
    const today = new Date(); // Get today's date
    const birthDate = new Date(year, month - 1, day); // Create a Date object for the birthdate
    
    let years = today.getFullYear() - birthDate.getFullYear(); // Calculate years
    let months = today.getMonth() - birthDate.getMonth(); // Calculate months
    let days = today.getDate() - birthDate.getDate(); // Calculate days

    // Adjust if days is negative (i.e., if the current day is earlier than the birth day in the month)
    if (days < 0) {
        months--; // Subtract one month
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Get last month's date
        days += lastMonth.getDate(); // Add the days from the previous month
    }

    // Adjust if months is negative (i.e., if the current month is earlier than the birth month in the year)
    if (months < 0) {
        years--; // Subtract one year
        months += 12; // Add 12 months to get the correct number of months
    }

    // Display the results
    yearSpan.textContent = years; // Show years
    monthSpan.textContent = months; // Show months
    daySpan.textContent = days; // Show days
}

// Calculate the age based on the given day, month, and year
function calculateDate(e) {
    e.preventDefault(); // Prevent form submission
    
    let isValid = true; // Flag to track if all inputs are valid
    const dayValue = dayInput.value.trim(); // Get day input value and trim any extra spaces
    const monthValue = monthInput.value.trim(); // Get month input value and trim any extra spaces
    const yearValue = yearInput.value.trim(); // Get year input value and trim any extra spaces

    // Validate day input
    if (!dayValue) {
        errorDay.textContent = 'This field is required'; // Show error if empty
        isValid = false;
    } else if (!validateDay(Number(dayValue))) { // Validate if day is valid
        isValid = false;
    }

    // Validate month input
    if (!monthValue) {
        errorMonth.textContent = 'This field is required'; // Show error if empty
        isValid = false;
    } else if (!validateMonth(Number(monthValue))) { // Validate if month is valid
        isValid = false;
    }

    // Validate year input
    if (!yearValue) {
        errorYear.textContent = 'This field is required'; // Show error if empty
        isValid = false;
    } else if (!validateYear(Number(yearValue))) { // Validate if year is valid
        isValid = false;
    }

    // If any validation fails, reset the results and stop further calculations
    if (!isValid) {
        resetResults();
        return;
    }

    getDate(dayValue, monthValue, yearValue)
}

form.addEventListener('submit', calculateDate);
