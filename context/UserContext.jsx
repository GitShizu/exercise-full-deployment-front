import axios from "axios";
import { createContext, useContext, useState } from "react";
const { VITE_API_URL } = import.meta.env;

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUp = async ({ email, password, password2 }) => {
        if (loading) return;

        setError(null);
        setLoading(true);

        if (password !== password2) {
            throw new Error("Password doesn't match")
        }
        try {
            const { data: user } = await axios.post(`${VITE_API_URL}/signup`, {
                email,
                password
            })
            setUser(user)
        } catch (error) {
            console.error(error)
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }

    const logIn = async (email, password) => {
        if (loading) return;

        setError(null);
        setLoading(true);

        try {
            const { data: user } = await axios.post(`${VITE_API_URL}/signup`, {
                email,
                password
            })
            setUser(user)
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }

    const value = {
        user,
        logIn,
        signUp,
        error,
        loading
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}

export const useUser = () => {
    const context = useContext(UserContext)

    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context;
}