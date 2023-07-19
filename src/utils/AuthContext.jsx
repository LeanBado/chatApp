import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../pages/appWriteConfig";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setloading] = useState(true)
    const [user, setuser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      setloading(false)
    }, [])
    
    const handleUserLogin = async (event, {email, password}) => {
        event.preventDefault()

        try {
            const response = await account.createEmailSession(email, password);
            const accountGet = await account.get()
            console.log(accountGet)
            setuser(accountGet)
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    const contextData = {
        user,
        handleUserLogin,
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
}
export const useAuth = () => {
    return useContext(AuthContext)
}
export default AuthContext