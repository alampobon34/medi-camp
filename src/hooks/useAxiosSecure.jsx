import axios from 'axios'
import { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'

export const axiosSecure = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: 'https://ph-b9-assignment-12-server.vercel.app',
    withCredentials: true,
})
const useAxiosSecure = () => {
    const { logOut, setLoading } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                console.log('error in the interceptors', error.response)
                if (error.response.status === 401 || error.response.status === 403) {
                    await logOut()
                    setLoading(false)
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        )
    }, [logOut, navigate])

    return axiosSecure
}

export default useAxiosSecure