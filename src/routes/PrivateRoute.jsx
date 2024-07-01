import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/shared/Loader'

export const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <Loader className={'fixed inset-0 w-full h-full'} />
    if (user) return children
    return <Navigate to='/login' state={location.pathname} replace='true' />
}
export default PrivateRoute