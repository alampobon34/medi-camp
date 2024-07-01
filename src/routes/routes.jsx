import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import CampDetails from '../pages/camp-details/CampDetails'
import Camps from '../pages/camps/Camps'
import DashboardLayout from '../layouts/DashboardLayout'
import Analytics from '../pages/dashboard/participant/Analytics'
import Profile from '../pages/dashboard/common/Profile'
import RegisteredCamps from '../pages/dashboard/participant/RegisteredCamps'
import PaymentHistory from '../pages/dashboard/participant/PaymentHistory'
import CampForm from '../pages/dashboard/organizer/CampForm'
import ManageCamp from '../pages/dashboard/organizer/ManageCamp'
import ManageRegisterCamp from '../pages/dashboard/organizer/ManageRegisterCamp'
import PrivateRoute from './PrivateRoute'
import ParticipantRoute from './ParticipantRoute'
import OrganizerRoute from './OrganizerRoute'
import GuestRoute from './GuestRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/camp-details/:id',
                element: <CampDetails />,
            },
            {
                path: '/camps',
                element: <Camps />,
            },
        ],
    },
    { path: '/login', element: <GuestRoute><Login /></GuestRoute> },
    { path: '/register', element: <GuestRoute><Register /></GuestRoute> },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'analytics',
                element: <ParticipantRoute><Analytics /></ParticipantRoute>,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'registered-camps',
                element: <ParticipantRoute><RegisteredCamps /></ParticipantRoute>,
            },
            {
                path: 'payment-history',
                element: <ParticipantRoute><PaymentHistory /></ParticipantRoute>,
            },

            // for organizer 
            {
                path: 'profile',
                element: <OrganizerRoute><Profile /></OrganizerRoute>,
            },
            {
                path: 'add-camp',
                element: <OrganizerRoute><CampForm isUpdate={false} /></OrganizerRoute>,
            },
            {
                path: 'manage-camps',
                element: <OrganizerRoute><ManageCamp /></OrganizerRoute>,
            },
            {
                path: 'update-camp/:id',
                element: <OrganizerRoute><CampForm isUpdate={true} /></OrganizerRoute>,
            },
            {
                path: 'manage-registered-camps',
                element: <OrganizerRoute><ManageRegisterCamp /></OrganizerRoute>,
            },
        ],
    },

])