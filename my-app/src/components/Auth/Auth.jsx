"use client"
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [ token, setToken ] = useState(null);
    const [ user, setUser ] = useState("");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken(null);
        return localStorage.removeItem("token");
    }

    const userAuthentication = async () => {
        if (!token) return; // don’t call if no token

        try {
            const response = await axios.get(
                `${API_URL}/api/auth/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 200) {
                console.log("User Data: ", response.data.userData);
                setUser(response.data.userData);
            }

        } catch (error) {
            console.log("Error fetching Data", error);
            setUser(""); // clear user if error
        }
    }

    useEffect(() => {
        userAuthentication();
    }, [token]); // re-run when token changes

    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const AuthContextValue = useContext(AuthContext);
    if(!AuthContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return AuthContextValue;
};
