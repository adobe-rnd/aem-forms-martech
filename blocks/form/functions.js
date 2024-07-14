/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

function isReturningVisitor() {
  const isReturning = document.cookie.indexOf('visitorId=') !== -1;
  if (!isReturning) {
    let expires = '';
    const date = new Date();
    date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
    document.cookie = `visitorId=id-${Date.now()}${expires}; path=/`;
  }
  return isReturning;
}

/**
 * Calculate EMI for a loan.
 * @param {number} loanAmount - The principal amount of the loan.
 * @param {number} annualROI - The annual rate of interest (as a percentage).
 * @param {number} termMonths - The term of the loan in months.
 * @returns {number} - The calculated EMI.
 */
function calculateEMI(loanAmount, annualROI, termMonths) {
  // Convert annual ROI to a monthly rate (decimal)
  const roi = (annualROI / 100) / 12;

  // Calculate EMI using the formula
  const emi = (loanAmount * roi * (1 + roi) ** termMonths) / ((1 + roi) ** termMonths - 1);

  // Return the EMI rounded to 2 decimal places
  return emi.toFixed(2);
}

// eslint-disable-next-line import/prefer-default-export
export {
  getFullName, days, isReturningVisitor, calculateEMI,
};
