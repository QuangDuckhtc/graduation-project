const initState = {};

const myReducer = (state = initState, action) => {
  switch (action.type) {
    case 'VALUE_SEARCH':
      state = action.valueSearch
      return state;
    default:
      return state;
  }
}

export default myReducer;