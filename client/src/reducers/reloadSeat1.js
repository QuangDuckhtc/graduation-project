const initState = false;

const myReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RELOAD_SEAT1':
            return true;
        case 'NO_RELOAD_SEAT1':
            return false;
        default:
            return state;
    }
}

export default myReducer;