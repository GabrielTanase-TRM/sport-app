export const validation = {
  lettersOnly: /^[a-zA-Z]+$/,
  oneLowerUpperDigit: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  isHexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
};

// added between range for each regex
// pw no white spaces
