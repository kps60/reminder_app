const initialState = {
    userId: null,
    isAuthenticated: false,
    verified: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, userId: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, userId: null, isAuthenticated: false };
        case 'VERIFY':
            return { ...state, verified: action.payload }
        default:
            return state;
    }
};

export default userReducer; 