import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/shared/Loader'

const GuestRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <Loader className={'fixed inset-0 w-full h-full'} />
    if (user) return <Navigate to='/' state={location.pathname} replace='true' />
    return children
}

export default GuestRoute