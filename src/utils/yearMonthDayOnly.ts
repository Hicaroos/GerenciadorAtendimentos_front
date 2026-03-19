export const yearMonthDayOnly = (date: Date | string, formatted: boolean = false) => {
  
  let year: string;
  let month: string;
  let day: string;

  if (date instanceof Date) {
    year = date.getFullYear().toString();
    month = (date.getMonth() + 1).toString().padStart(2, '0');
    day = date.getDate().toString().padStart(2, '0');
  } else {
    const simpleDate = date.split('T')[0]; 
    [year, month, day] = simpleDate.split('-');
  }

  let baseDate = `${year}-${month}-${day}`;

  if (formatted) {
    baseDate = `${day}/${month}/${year}`;
    return baseDate;
  }

  return baseDate;
};