import Constants from "./constants";
const { USER_KEY } = Constants;

export const isArrayNotEmpty = (array) => Array.isArray(array) && array.length;

export const getUser = () => {
  if (localStorage.length) {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
  return null;
};
