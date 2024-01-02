const userReducer = (state = null, action) => {
  console.log("Action received:", action);

  switch (action.type) {
    case "SET_USER":
      return action.user;

    case "GET_USER":
      return state;

    case "GET_USER_NULL":
      return null;

    default:
      return state;
  }
};

export default userReducer;
