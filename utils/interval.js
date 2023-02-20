const constants = {
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 86400000,
};

const minuteInterval = (start, end) => {
  return Math.floor((new Date(start) - new Date(end)) / constants.minute + 0.1);
};

const secondsInterval = (start, end) => {
  return Math.floor((new Date(start) - new Date(end)) / constants.second);
};

const interval = (start, end) => {
  const diff = Math.floor(new Date(start) - new Date(end));
  return intervalUnits(diff);
};

const intervalUnits = diff => {
  if (diff < constants.minute) {
    return Math.floor(diff / constants.second + 1) + ' seconds';
  } else if (diff < constants.hour) {
    return Math.floor(diff / constants.minute) + ' minutes';
  } else if (diff < constants.day) {
    return Math.floor(diff / constants.hour) + ' hours';
  }
  return Math.floor(diff / constants.day) + ' days';
};

export default interval;
