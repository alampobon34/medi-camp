import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { GoSignOut } from "react-icons/go";

const Sidebar = ({ menuList, role }) => {
    const { logOut } = useAuth()
    const navigate = useNavigate();

    const handleSignOut = () => {
        logOut().then(() => {
            navigate('/login')
        }).catch(e => console.log(e))
    }
    return (
        <>
            <Card className="h-screen w-full shadow-xl rounded-none z-30">
                <div className="py-5 border bg-black/80">
                </div>
                <div className="text-center py-3">
                    <Typography variant="h5" color="black">
                        {role === 'Organizer' ? 'Organizer' : 'Participant'}
                    </Typography>
                    {
                        role &&
                        <button type='button' className='mt-2' onClick={handleSignOut}>
                            <GoSignOut className='w-6 h-6 text-black' />
                        </button>
                    }
                </div>
                <List>
                    {
                        menuList.map((menu, index) => (
                            <Link className="border rounded-lg" to={`/dashboard${menu.address}`} key={index}>
                                <ListItem >
                                    {menu.name}
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
            </Card>
        </>
    )
}

export default Sidebar





