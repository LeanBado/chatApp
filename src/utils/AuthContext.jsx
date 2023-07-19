import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../pages/appWriteConfig";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setloading] = useState(true)
    const [user, setuser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {

        try {
            const accountGet = await account.get()
            setuser(accountGet)
            
            
        } catch (error) {
            console.log(error)
        }
        setloading(false)
        
    }
    
    const handleUserLogin = async (event, {email, password}) => {
        event.preventDefault()

        try {
            await account.createEmailSession(email, password);
            const accountGet = await account.get()
            console.log(accountGet)
            setuser(accountGet)
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = async () => {
        const response = await account.deleteSession('current');
        setuser(null)
    }

    const handleUserRegister = async (event, {email, password1, password2, name}) => {
        event.preventDefault()

        if(password1 !== password2){
            alert('Password do not match')
        }

        try {
             await account.create(ID.unique(), email, password1, name);
             await account.createEmailSession(email, password1);
            const accountGet = await account.get()

            setuser(accountGet)
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    const contextData = {
        user,
        handleUserLogin,
        handleLogout,
        handleUserRegister,
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
}
export const useAuth = () => {
    return useContext(AuthContext)
}
export default AuthContext