
let errorMessage = null;

export const setError = (message) => {
  errorMessage = message;
};

export const clearError = () => {
  errorMessage = null;
};

export const getError = () => {
  return errorMessage;
};
