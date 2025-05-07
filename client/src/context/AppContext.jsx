import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const loadUserData = async () => {
        try {
            const { data } = await axios.get('/api/user/profile', { headers: { token } })
            if (data.success) {
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post('/api/image/generate-image', { prompt }, { headers: { token } })

            if (data.success) {
                return data.resultImage
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Image generation error:', error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }

    useEffect(()=>{
        if (token) {
            loadUserData()
        }
    },[token])

    const value = {
        token, setToken,
        user, setUser,
        showLogin, setShowLogin,
        backendUrl,
        generateImage,
        logout
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider