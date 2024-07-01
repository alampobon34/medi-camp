import { Navigate } from 'react-router-dom'
import useRole from '../hooks/useRole'
import Loader from '../components/shared/Loader'
import toast from 'react-hot-toast'
const OrganizerRoute = ({ children }) => {
    const { role, isLoading } = useRole()

    if (isLoading) return <Loader className={'fixed inset-0 w-full h-full'} />
    if (role === 'Organizer') return children
    return <Navigate to='/dashboard' />
}

export default OrganizerRoute