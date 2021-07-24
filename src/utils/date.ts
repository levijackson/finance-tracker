/**
 * Format the date to something nice for a user to see
 * @param date 
 */
const formatDate = (date: Date): string => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
};

/**
 * Get the name of the month given a number
 * @param monthNumber
 */
const getMonthName = (monthNumber: number): string => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[monthNumber];
};

/**
 * Get the yyyy-mm for today
 * @returns string
 */
const getYearMonth = () => {
  const currentDate = new Date();
  return currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2)
};

export {
  formatDate,
  getMonthName,
  getYearMonth
};