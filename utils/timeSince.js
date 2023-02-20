// https://stackoverflow.com/a/3177838
const timeSince = date => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' taon';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' buwan';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' araw';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' oras';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minuto';
  }
  return Math.floor(seconds) + ' segundo';
};

export default timeSince;
