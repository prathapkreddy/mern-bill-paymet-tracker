import { logoutFirebaseUser } from '../../firebase.config.ts';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    const logoutUser = async () => {
        await logoutFirebaseUser();
        navigate('/login');
    };

    return (
        <>
            <div>Header</div>
            <button onClick={logoutUser}>Logout</button>
        </>
    );
}
