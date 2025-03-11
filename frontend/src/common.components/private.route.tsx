import {  Navigate } from 'react-router-dom'
import {getAuth} from "firebase/auth";
import Layout from "./layout.tsx";

const PrivateRoutes = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    console.log({uid:user?.getIdToken()})
    return(
        user?.getIdToken() ? <Layout/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes