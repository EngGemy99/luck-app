const getLocalTime = () => {
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const dateString = `${year}-${month}-${day}`;
  const weekNumber = getWeek(new Date(dateString));

  return {
    day,
    month,
    weekNumber,
    year,
  };
};
function getWeek(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const millisecsInDay = 86400000;
  return Math.ceil((date - oneJan) / millisecsInDay / 7);
}

export { getLocalTime };
