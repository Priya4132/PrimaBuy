import app from "@/firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

const auth = getAuth();

// Signup function
export const register = (email, password) => async (dispatch) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        // Store userId in localStorage for persistence
        localStorage.setItem("userId", user.uid);

        dispatch({ 
            type: REGISTER_USER, 
            payload: { uid: user.uid, email: user.email } 
        });

    } catch (error) {
        console.error("Registration error:", error.message);
    }
};

// Login function
export const login = (email, password) => async (dispatch) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        // Store userId in localStorage
        localStorage.setItem("userId", user.uid);

        dispatch({ 
            type: LOGIN_USER, 
            payload: { uid: user.uid, email: user.email } 
        });

    } catch (error) {
        console.error("Login error:", error.message);
    }
};

// Logout function
export const logout = () => async (dispatch) => {
    try {
        await signOut(auth);
        
        // Clear localStorage on logout
        localStorage.removeItem("userId");

        dispatch({ type: LOGOUT_USER });

    } catch (error) {
        console.error("Logout error:", error.message);
    }
};
