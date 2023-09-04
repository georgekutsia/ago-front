
let errorMessage = null;

export const setError = (message) => {
  errorMessage = message;
  console.log("bulala",errorMessage);
};

export const clearError = () => {
  errorMessage = null;
};

export const  getError =  async () => {
  return await errorMessage;
};
