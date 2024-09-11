export function formatDate(isoDateString) {
  // Create a new Date object from the ISO date string
  const date = new Date(isoDateString);

  // Define an array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract the month, day, and year from the Date object
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Return the formatted date string
  return `${month} ${day}, ${year}`;
}
