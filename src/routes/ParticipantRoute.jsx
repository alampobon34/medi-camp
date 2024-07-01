import { Navigate } from 'react-router-dom'
import useRole from '../hooks/useRole'
import Loader from '../components/shared/Loader'
const ParticipantRoute = ({ children }) => {
    const { role, isLoading } = useRole()

    if (isLoading) return <Loader className={'fixed inset-0 w-full h-full'} />
    if (role === 'Participant') return children
    return <Navigate to='/dashboard' />
}

export default ParticipantRoute