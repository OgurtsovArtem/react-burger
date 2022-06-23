export const formValidator = (target: HTMLInputElement) => {
  let isValid = false;
  switch (true) {
    case target.validity.tooShort:
      isValid = false;
      break;
    case target.validity.valueMissing:
      isValid = false;
      break;
    case target.validity.typeMismatch:
      isValid = false;
      break;
    case !target.checked && target.type === "checkbox":
      isValid = false;
      break;
    default:
      isValid = true;
      break;
  }
  return isValid;
};
