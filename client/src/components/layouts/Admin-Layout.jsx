import { NavLink, Outlet ,Navigate} from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";
import {useAuth} from "../../store/auth";
export const AdminLayout=()=>{
    const{user,isLoading} =useAuth();
    if(isLoading) return <h1>Loadind</h1>;
    if(!user.isAdmin) return <Navigate to="/"/>;
return (
    <>
<header>
    <div className="container">
        <nav>
            <ul>
                <li>
               < NavLink to="/admin/users">
               <FaUser/> users
               </NavLink>
                </li>
            <li>
            < NavLink to="/admin/contacts">
               <FaUser/>Contacts
               </NavLink>
            </li>
            <li>
            < NavLink to="/service">
               <FaUser/> Services
               </NavLink>
            </li>
            <li>
            < NavLink to="/">
               <FaUser/> Home
               </NavLink>
            </li>
            </ul>
            </nav>
        </div>
    </header>
    <Outlet/></>
);
}
