import axios from "axios";
import { useState } from "react";
const { VITE_API_URL } = import.meta.env;

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUp = async (email,password)=>{
        if(loading) return;

        setError(null);
        setLoading(true);

        try{
           const {data: user} = await axios.post(`${VITE_API_URL}/signup`,{
                email, 
                password
            })
            setUser(user)
        }
    }catch(error){
        console.error(error)
        setError(error.message);
    }finally{
        setLoading(false)
    }
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}