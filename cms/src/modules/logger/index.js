const colors = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  crimson: "\x1b[38m",
};

const showTime = true;

const info = (string) => {
  const time = showTime ? new Date().toLocaleString() : "";

  console.log(colors.yellow, `[${time}]`, "INFO:", colors.white, string);
};

const error = (string) => {
  const time = showTime ? new Date().toLocaleString() : "";

  console.log(colors.red, `[${time}]`, "ERROR:", colors.white, string);
};

module.exports = {
  info,
  error,
};
