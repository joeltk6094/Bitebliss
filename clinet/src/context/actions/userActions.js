export const setUserDetails = (user = null) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

  export const getUserDetails = (user) => {
    return {
      type: "GET_USER",
      user: user,
    };
  };
  
  export const setUserNull = () => {
    return {
      type: "GET_USER_NULL",
      user: null,
    };
  };
  