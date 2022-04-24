// export const validEmail = (email) => {
//   let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
//   return regex.test(email);
// };

export const Validate = {
  email(input) {
    // eslint-disable-next-line
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    return regex.test(input);
  },
  password(input) {
    return input.trim().length >= 6;
  },
  confirm(obj, val) {
    return obj.status && obj.input.trim() === val.trim();
  },
};

export const Error = {
  email(input) {
    return input.trim().length === 0
      ? "Email field is blank"
      : "Email input is not a valid email";
  },
  password(input) {
    return input.trim().length === 0
      ? "Password field is blank"
      : "Password too short (at least 6 characters)";
  },
  confirm(obj, val) {
    if (obj.input.trim() !== val.trim()) return "Confirmation does not match";
  },
};
