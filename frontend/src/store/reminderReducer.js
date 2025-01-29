const initialState = {
    reminders: [],
};

const reminderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_REMINDERS':
            return { ...state, reminders: action.payload };
        case 'ADD_REMINDER':
            return { ...state, reminders: [...state.reminders, action.payload] };
        case 'REMOVE_REMINDER':
            return { ...state, reminders: state.reminders.filter(reminder => reminder._id !== action.payload) };
        default:
            return state;
    }
};

export default reminderReducer; 