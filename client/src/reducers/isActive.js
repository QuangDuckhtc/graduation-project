const initState = false;

const myReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ACTIVE':
      state = true;
      return state;
    case 'NO_ACTIVE':
      state = false;
      return state;
    default:
      return state;
  }
}

export default myReducer;