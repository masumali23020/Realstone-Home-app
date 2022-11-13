
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../images/hoocks/useAuthStatus';
import Spener from './Spener';


export default function PrivateRouter() {
    const { loggedIn, checkingStatus} = useAuthStatus()
    if(checkingStatus){
    return   <Spener />
    }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}
