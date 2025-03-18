const initialState = {
    userId: localStorage.getItem("userId") || null,
    isAuthenticated: !!localStorage.getItem("userId"),
};

export const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_USER":
        case "LOGIN_USER":
            localStorage.setItem("userId", action.payload.uid);
            return { ...state, userId: action.payload.uid, isAuthenticated: true };

        case "LOGOUT_USER":
            localStorage.removeItem("userId");
            return { ...state, userId: null, isAuthenticated: false };

        default:
            return state;
    }
};
