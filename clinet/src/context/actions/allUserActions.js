// Action creator
export const setAllUserDetails = (data) => {
  return {
    type: "SET_ALL_USER", 
    allUser: data,
  };
};

export const getAllUserDetails = () => {
  return {
    type: "GET_ALL_USER", 
  };
};

